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

const MIN_GAMEPAD_PORT = 0;
const MAX_GAMEPAD_PORT = 5;

export const PORT_FIELD_NAME = 'GAMEPAD_PORT';
export const BUTTON_FIELD_NAME = 'GAMEPAD_BUTTON';
export const ACTION_FIELD_NAME = 'GAMEPAD_ACTION';
export const AXIS_FIELD_NAME = 'GAMEPAD_AXIS';
export const EVENT_FIELD_NAME = 'GAMEPAD_EVENT';

const BUTTON_CONFIG = new Map([
    ['A', { display: () => Blockly.Msg['GAMEPAD_BUTTON_A'], method: 'getA' }],
    ['B', { display: () => Blockly.Msg['GAMEPAD_BUTTON_B'], method: 'getB' }],
    ['X', { display: () => Blockly.Msg['GAMEPAD_BUTTON_X'], method: 'getX' }],
    ['Y', { display: () => Blockly.Msg['GAMEPAD_BUTTON_Y'], method: 'getY' }],
    ['DPAD_UP', { display: () => Blockly.Msg['GAMEPAD_DPAD_UP'], method: 'getDpadUp' }],
    ['DPAD_DOWN', { display: () => Blockly.Msg['GAMEPAD_DPAD_DOWN'], method: 'getDpadDown' }],
    ['DPAD_LEFT', { display: () => Blockly.Msg['GAMEPAD_DPAD_LEFT'], method: 'getDpadLeft' }],
    ['DPAD_RIGHT', { display: () => Blockly.Msg['GAMEPAD_DPAD_RIGHT'], method: 'getDpadRight' }],
    ['LEFT_BUMPER', { display: () => Blockly.Msg['GAMEPAD_LEFT_BUMPER'], method: 'getLeftBumper' }],
    ['RIGHT_BUMPER', { display: () => Blockly.Msg['GAMEPAD_RIGHT_BUMPER'], method: 'getRightBumper' }],
    ['BACK', { display: () => Blockly.Msg['GAMEPAD_BACK'], method: 'getBack' }],
    ['START', { display: () => Blockly.Msg['GAMEPAD_START'], method: 'getStart' }],
    ['GUIDE', { display: () => Blockly.Msg['GAMEPAD_GUIDE'], method: 'getGuide' }],
    ['LEFT_STICK_BUTTON', { display: () => Blockly.Msg['GAMEPAD_LEFT_STICK_BUTTON'], method: 'getLeftStickButton' }],
    ['RIGHT_STICK_BUTTON', { display: () => Blockly.Msg['GAMEPAD_RIGHT_STICK_BUTTON'], method: 'getRightStickButton' }]
]);

const AXIS_CONFIG = new Map([
    ['LEFT_STICK_X', { display: () => Blockly.Msg['GAMEPAD_LEFT_STICK_X'], method: 'getLeftX' }],
    ['LEFT_STICK_Y', { display: () => Blockly.Msg['GAMEPAD_LEFT_STICK_Y'], method: 'getLeftY' }],
    ['RIGHT_STICK_X', { display: () => Blockly.Msg['GAMEPAD_RIGHT_STICK_X'], method: 'getRightX' }],
    ['RIGHT_STICK_Y', { display: () => Blockly.Msg['GAMEPAD_RIGHT_STICK_Y'], method: 'getRightY' }],
    ['LEFT_TRIGGER', { display: () => Blockly.Msg['GAMEPAD_LEFT_TRIGGER'], method: 'getLeftTrigger' }],
    ['RIGHT_TRIGGER', { display: () => Blockly.Msg['GAMEPAD_RIGHT_TRIGGER'], method: 'getRightTrigger' }]
]);

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
    return new Blockly.FieldDropdown(
        Array.from(BUTTON_CONFIG.entries()).map(([key, config]) => [config.display(), key])
    )
}
export function createAnalogAxisField(): Blockly.Field {
    return new Blockly.FieldDropdown(
        Array.from(AXIS_CONFIG.entries()).map(([key, config]) => [config.display(), key])
    )
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
    // TODO: Update this when the actual driver station display class is implemented
    const config = BUTTON_CONFIG.get(button);
    const suffix = ACTION_CONFIG.get(action);

    if (config === undefined || suffix === undefined) {
        return '';
    }

    return getGamepad(gamepad) + '.' +
        config.method +
        suffix.suffix + '()';
}

export function methodForAxis(gamepad: number, axis: string): string {
    // TODO: Update this when the actual driver station display class is implemented
    return getGamepad(gamepad) + '.' +
        (AXIS_CONFIG.get(axis)?.method ?? '') + '()';
}