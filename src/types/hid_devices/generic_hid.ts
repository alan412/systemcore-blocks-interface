import * as Blockly from 'blockly';

const BUTTON_CONFIG = new Map([
    ['1', { display: () => '1', method: 'getRawButton(1)', comment: '' }],
    ['2', { display: () => '2', method: 'getRawButton(2)', comment: '' }],
    ['3', { display: () => '3', method: 'getRawButton(3)', comment: '' }],
    ['4', { display: () => '4', method: 'getRawButton(4)', comment: '' }],
    ['5', { display: () => '5', method: 'getRawButton(5)', comment: '' }],
    ['6', { display: () => '6', method: 'getRawButton(6)', comment: '' }],
    ['7', { display: () => '7', method: 'getRawButton(7)', comment: '' }],
    ['8', { display: () => '8', method: 'getRawButton(8)', comment: '' }],
    ['9', { display: () => '9', method: 'getRawButton(9)', comment: '' }],
    ['10', { display: () => '10', method: 'getRawButton(10)', comment: '' }],
    ['11', { display: () => '11', method: 'getRawButton(11)', comment: '' }],
    ['12', { display: () => '12', method: 'getRawButton(12)', comment: '' }],
    ['13', { display: () => '13', method: 'getRawButton(13)', comment: '' }],
    ['14', { display: () => '14', method: 'getRawButton(14)', comment: '' }],
    ['15', { display: () => '15', method: 'getRawButton(15)', comment: '' }],
    ['16', { display: () => '16', method: 'getRawButton(16)', comment: '' }],
]);

const AXIS_CONFIG = new Map([
    ['1', { display: () => '1', method: 'getRawAxis(1)', comment: '' }],
    ['2', { display: () => '2', method: 'getRawAxis(2)', comment: '' }],
    ['3', { display: () => '3', method: 'getRawAxis(3)', comment: '' }],
    ['4', { display: () => '4', method: 'getRawAxis(4)', comment: '' }],
    ['5', { display: () => '5', method: 'getRawAxis(5)', comment: '' }],
    ['6', { display: () => '6', method: 'getRawAxis(6)', comment: '' }],
    ['7', { display: () => '7', method: 'getRawAxis(7)', comment: '' }],
    ['8', { display: () => '8', method: 'getRawAxis(8)', comment: '' }],
    ['9', { display: () => '9', method: 'getRawAxis(9)', comment: '' }],
    ['10', { display: () => '10', method: 'getRawAxis(10)', comment: '' }],
    ['11', { display: () => '11', method: 'getRawAxis(11)', comment: '' }],
    ['12', { display: () => '12', method: 'getRawAxis(12)', comment: '' }],
    ['13', { display: () => '13', method: 'getRawAxis(13)', comment: '' }],
    ['14', { display: () => '14', method: 'getRawAxis(14)', comment: '' }],
    ['15', { display: () => '15', method: 'getRawAxis(15)', comment: '' }],
    ['16', { display: () => '16', method: 'getRawAxis(16)', comment: '' }],
]);

const RUMBLE_CONFIG = new Map([
    ['LEFT_RUMBLE', { display: () => Blockly.Msg['GAMEPAD_RUMBLE_LEFT'], rumbleType: 'kLeftRumble'}],
    ['RIGHT_RUMBLE', { display: () => Blockly.Msg['GAMEPAD_RUMBLE_RIGHT'], rumbleType: 'kRightRumble'}],
    ['TRIGGER_LEFT_RUMBLE', { display: () => Blockly.Msg['GAMEPAD_RUMBLE_LEFT_TRIGGER'], rumbleType: 'kLeftTriggerRumble'}],
    ['TRIGGER_RIGHT_RUMBLE', { display: () => Blockly.Msg['GAMEPAD_RUMBLE_RIGHT_TRIGGER'], rumbleType: 'kRightTriggerRumble'}],
]);

const LED_CONFIG = new Map([
    ['LEDS', { display: () => Blockly.Msg['GAMEPAD_LEDS'], method: 'setLeds'}],
]);


/** Returns the button configuration for generic gamepad. */
export function getButtonConfig() {
    return BUTTON_CONFIG;
}

/** Returns the axis configuration for generic gamepad. */
export function getAxisConfig() {
    return AXIS_CONFIG;
}

/** Returns the rumble configuration for generic gamepad. */
export function getRumbleConfig() {
    return RUMBLE_CONFIG;
}

/** Returns the LED configuration for generic gamepad. */
export function getLEDConfig() {
    return LED_CONFIG;
}

//TODO(alan): Touchpad fingers not supported yet in this version