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
import { GamepadType, GamepadTypeUtils } from '../types/GamepadType';

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

export function createButtonField(): Blockly.Field {
    return new Blockly.FieldDropdown(function(this: Blockly.FieldDropdown): Blockly.MenuOption[] {
        // Get the source block to access the port field
        const block = this.getSourceBlock();
        if (!block) {
            // Fallback to generic config if block is not available
            const genericConfig = GamepadTypeUtils.getButtonConfig(GamepadType.GAMEPAD_GENERIC);
            const options: Blockly.MenuOption[] = [];
            for (const [key, config] of genericConfig.entries()) {
                options.push([config.display(), key]);
            }
            return options;
        }

        // Get the port number from the PORT_FIELD_NAME field
        const portField = block.getField(PORT_FIELD_NAME);
        const port = portField ? Number(portField.getValue()) : 0;

        // Get the gamepad type for this port
        const gamepadType = GamepadTypeUtils.getGamepad(port, currentGamepadConfig);

        // Get the button configuration for this gamepad type
        const buttonConfig = GamepadTypeUtils.getButtonConfig(gamepadType);

        // Convert to dropdown options
        const options: Blockly.MenuOption[] = [];
        for (const [key, config] of buttonConfig.entries()) {
            options.push([config.display(), key]);
        }
        return options;
    });
}

export function createAnalogAxisField(): Blockly.Field {
    return new Blockly.FieldDropdown(function(this: Blockly.FieldDropdown): Blockly.MenuOption[] {
        // Get the source block to access the port field
        const block = this.getSourceBlock();
        if (!block) {
            // Fallback to generic config if block is not available
            const genericConfig = GamepadTypeUtils.getAxisConfig(GamepadType.GAMEPAD_GENERIC);
            const options: Blockly.MenuOption[] = [];
            for (const [key, config] of genericConfig.entries()) {
                options.push([config.display(), key]);
            }
            return options;
        }

        // Get the port number from the PORT_FIELD_NAME field
        const portField = block.getField(PORT_FIELD_NAME);
        const port = portField ? Number(portField.getValue()) : 0;

        // Get the gamepad type for this port
        const gamepadType = GamepadTypeUtils.getGamepad(port, currentGamepadConfig);

        // Get the axis configuration for this gamepad type
        const axisConfig = GamepadTypeUtils.getAxisConfig(gamepadType);

        // Convert to dropdown options
        const options: Blockly.MenuOption[] = [];
        for (const [key, config] of axisConfig.entries()) {
            options.push([config.display(), key]);
        }
        return options;
    });
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
    // Get the gamepad type for this port
    const gamepadType = GamepadTypeUtils.getGamepad(gamepad, currentGamepadConfig);
    
    // Get the button configuration for this gamepad type
    const buttonConfig = GamepadTypeUtils.getButtonConfig(gamepadType);
    const config = buttonConfig.get(button);
    const suffix = ACTION_CONFIG.get(action);

    if (config === undefined || suffix === undefined) {
        return '';
    }

    return getGamepad(gamepad) + '.' +
        config.method +
        suffix.suffix + '()';
}

export function methodForAxis(gamepad: number, axis: string): string {
    // Get the gamepad type for this port
    const gamepadType = GamepadTypeUtils.getGamepad(gamepad, currentGamepadConfig);
    
    // Get the axis configuration for this gamepad type
    const axisConfig = GamepadTypeUtils.getAxisConfig(gamepadType);
    
    return getGamepad(gamepad) + '.' +
        (axisConfig.get(axis)?.method ?? '') + '()';
}