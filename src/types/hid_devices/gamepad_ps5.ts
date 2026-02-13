import * as PS4 from './gamepad_ps4';

/** Returns the button configuration for PS5 gamepad. */
export function getButtonConfig() {
    return PS4.getButtonConfig();  // same as PS4 gamepad
}

/** Returns the axis configuration for PS5 gamepad. */
export function getAxisConfig() {
    return PS4.getAxisConfig();
}

/** Returns the axis configuration for PS5 gamepad. */
export function getRumbleConfig() {
    return PS4.getRumbleConfig();
}

/** Returns the LED configuration for PS5 gamepad. */
export function getLEDConfig() {
    return PS4.getLEDConfig();
}