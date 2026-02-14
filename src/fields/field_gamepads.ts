/**
 * @license
 * Copyright 2026 Porpoiseful LLC
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview This has the fields for selecting gamepad ports and buttons
 * @author alan@porpoiseful.com (Alan Smith)
 */

import * as Blockly from 'blockly/core';
import { createFieldNumberDropdown } from './field_number_dropdown';
import * as storageProject from '../storage/project';
import { GamepadTypeUtils } from '../types/GamepadType';

const MIN_GAMEPAD_PORT = 0;
const MAX_GAMEPAD_PORT = 5;

// Module-level variable to store the current gamepad configuration
let currentGamepadConfig: storageProject.GamepadConfig = GamepadTypeUtils.getDefaultGamepadConfig();

/**
 * Updates the current gamepad configuration used for dynamic dropdown generation.
 * This should be called when the project is loaded or when the gamepad config changes.
 */
export function updateGamepadConfig(config: storageProject.GamepadConfig): void {
    currentGamepadConfig = config;
}

/**
 * Gets the gamepad type for the port specified in a dropdown field's source block.
 * @param dropdown The dropdown field to get the source block from.
 * @returns The GamepadType for the configured port, or NONE if block is unavailable.
 */
function getGamepadTypeForDropdown(dropdown: Blockly.FieldDropdown) {
    const block = dropdown.getSourceBlock();
    if (!block) {
        return GamepadTypeUtils.getGamepad(0, currentGamepadConfig);
    }

    const portField = block.getField(PORT_FIELD_NAME);
    const port = portField ? Number(portField.getValue()) : 0;
    return GamepadTypeUtils.getGamepad(port, currentGamepadConfig);
}

export const PORT_FIELD_NAME = 'GAMEPAD_PORT';
export const BUTTON_FIELD_NAME = 'GAMEPAD_BUTTON';
export const ACTION_FIELD_NAME = 'GAMEPAD_ACTION';
export const AXIS_FIELD_NAME = 'GAMEPAD_AXIS';
export const EVENT_FIELD_NAME = 'GAMEPAD_EVENT';

const ACTION_CONFIG = new Map([
    ['IS_DOWN', { display: () => Blockly.Msg['GAMEPAD_IS_DOWN'], suffix: '' }],
    ['WAS_PRESSED', { display: () => Blockly.Msg['GAMEPAD_PRESSED'], suffix: 'Pressed' }],
    ['WAS_RELEASED', { display: () => Blockly.Msg['GAMEPAD_RELEASED'], suffix: 'Released' }]
]);

const EVENT_CONFIG = new Map([
    ['GAMEPAD_EVENT_PRESSED', { display: () => Blockly.Msg['GAMEPAD_EVENT_PRESSED'] }],
    ['GAMEPAD_EVENT_RELEASED', { display: () => Blockly.Msg['GAMEPAD_EVENT_RELEASED'] }],
    ['GAMEPAD_EVENT_CHANGED', { display: () => Blockly.Msg['GAMEPAD_EVENT_CHANGED'] }]
]);


export function createTitleField(): Blockly.Field {
    return new Blockly.FieldLabel(Blockly.Msg['GAMEPAD']);   
}

export function createPortField(): Blockly.Field {
    return createFieldNumberDropdown(MIN_GAMEPAD_PORT, MAX_GAMEPAD_PORT)
}

/**
 * Helper function to create a dynamic dropdown field based on gamepad configuration
 * @param getConfig - Function to retrieve the appropriate config map for a gamepad type
 * @returns A Blockly FieldDropdown that updates based on the selected gamepad port
 */
function createGamepadConfigField(
    getConfig: (gamepadType: GamepadType) => Map<string, { display: () => string }> | null
): Blockly.Field {
    return new Blockly.FieldDropdown(function(this: Blockly.FieldDropdown): Blockly.MenuOption[] {
        const options: Blockly.MenuOption[] = [];

        // Get the gamepad type for this port
        const gamepadType = getGamepadTypeForDropdown(this);

        // Get the configuration for this gamepad type
        const config = getConfig(gamepadType);

        // Convert to dropdown options
        if (config) {
            for (const [key, configItem] of config.entries()) {
                options.push([configItem.display(), key]);
            }
        }
        
        // If no options available, show disabled placeholder
        if (options.length === 0) {
            options.push(['---', '---']);
            this.setEnabled(false);
        } else {
            this.setEnabled(true);
        }
        
        return options;
    });
}

export function createButtonField(): Blockly.Field {
    return createGamepadConfigField(GamepadTypeUtils.getButtonConfig);
}

export function createAnalogAxisField(): Blockly.Field {
    return createGamepadConfigField(GamepadTypeUtils.getAxisConfig);
}

export function createActionField(): Blockly.Field {
    return new Blockly.FieldDropdown(
        Array.from(ACTION_CONFIG.entries()).map(([key, config]) => [config.display(), key])
    )
}

export function createEventField(): Blockly.Field {
    return new Blockly.FieldDropdown(
        Array.from(EVENT_CONFIG.entries()).map(([key, config]) => [config.display(), key])
    )
}

function getGamepad(gamepad: number): string {
    // TODO: Update this when the actual driver station display class is implemented
    return 'DriverStation.gamepads[' + gamepad + ']';
}

export function methodForButton(gamepad: number, button: string, action: string): string {
    const gamepadType = GamepadTypeUtils.getGamepad(gamepad, currentGamepadConfig);
    
    // Get the button configuration for this gamepad type
    const buttonConfig = GamepadTypeUtils.getButtonConfig(gamepadType);
    const config = buttonConfig?.get(button);
    const suffix = ACTION_CONFIG.get(action);

    if (config === undefined || suffix === undefined) {
        return '';
    }

    return getGamepad(gamepad) + '.' +
        config.method +
        suffix.suffix + '()';
}

export function methodForAxis(gamepad: number, axis: string): string {
    const gamepadType = GamepadTypeUtils.getGamepad(gamepad, currentGamepadConfig);
    
    // Get the axis configuration for this gamepad type
    const axisConfig = GamepadTypeUtils.getAxisConfig(gamepadType);
    
    return getGamepad(gamepad) + '.' +
        (axisConfig?.get(axis)?.method ?? '') + '()';
}