/**
 * @license
 * Copyright 2025 Porpoiseful LLC
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
 * @fileoverview A block for interfacing with the gamepad analog (sticks)
 * @author alan@porpoiseful.com (Alan Smith)
 */

/* NOTE: This will likely go away when we can parse the gamepad class
 * but it doesn't exist yet, so this is a placeholder.
 */

import * as Blockly from 'blockly/core';
import { PythonGenerator } from 'blockly/python';
import { MRC_STYLE_DRIVER_STATION } from '../themes/styles';
import { createFieldNumberDropdown } from '../fields/field_number_dropdown';


export const BLOCK_NAME = 'mrc_gamepad_analog';
const GAMEPAD_NUMBER_FIELD = 'GAMEPAD_NUM';

export const setup = function() {
  Blockly.Blocks[BLOCK_NAME] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Gamepad")
          .appendField(createFieldNumberDropdown(0,7), GAMEPAD_NUMBER_FIELD)
          .appendField(new
        Blockly.FieldDropdown([
          ['Left stick X', 'LEFT_STICK_X'],
          ['Left stick Y', 'LEFT_STICK_Y'],
          ['Right stick X', 'RIGHT_STICK_X'],
          ['Right stick Y', 'RIGHT_STICK_Y'],
          ['Left trigger', 'LEFT_TRIGGER'],
          ['Right trigger', 'RIGHT_TRIGGER'],
        ]), "AXIS");
      this.setOutput(true, 'Number');
      this.setStyle(MRC_STYLE_DRIVER_STATION);
    },
  };
};

function getMethodFromAxis(axis: string): string {
  switch (axis) {
    case 'LEFT_STICK_X':
      return 'getLeftX';
    case 'LEFT_STICK_Y':
      return 'getLeftY';
    case 'RIGHT_STICK_X':
      return 'getRightX';
    case 'RIGHT_STICK_Y':
      return 'getRightY';
    case 'LEFT_TRIGGER':
      return 'getLeftTrigger';
    case 'RIGHT_TRIGGER':
      return 'getRightTrigger';
    default:
      return 'getLeftX';
  }
}

export const pythonFromBlock = function(
    block: Blockly.Block,
    _: PythonGenerator,
) {
  // TODO: Update this when the actual driver station display class is implemented
  return 'DriverStation.gamepads[' + block.getFieldValue(GAMEPAD_NUMBER_FIELD) + '].' 
          + getMethodFromAxis(block.getFieldValue('AXIS')) + '()';
};
