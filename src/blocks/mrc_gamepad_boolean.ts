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
 * @fileoverview A block for interfacing with the gamepad boolean (button)
 * @author alan@porpoiseful.com (Alan Smith)
 */

/* NOTE: This will likely go away when we can parse the gamepad class
 * but it doesn't exist yet, so this is a placeholder.
 */

import * as Blockly from 'blockly/core';
import { PythonGenerator } from 'blockly/python';
import { MRC_STYLE_DRIVER_STATION } from '../themes/styles';
import { createFieldNumberDropdown } from '../fields/field_number_dropdown';


export const BLOCK_NAME = 'mrc_gamepad_boolean';
const GAMEPAD_NUMBER_FIELD = 'GAMEPAD_NUM';

export const setup = function() {
  Blockly.Blocks[BLOCK_NAME] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Gamepad")
          .appendField(createFieldNumberDropdown(0,7), GAMEPAD_NUMBER_FIELD)
          .appendField(new
        Blockly.FieldDropdown([
          ['A', 'A'],
          ['B', 'B'],
          ['X', 'X'],
          ['Y', 'Y'],
          ['Left Bumper', 'LEFT_BUMPER'],
          ['Right Bumper', 'RIGHT_BUMPER'],
          ['Back', 'BACK'],
          ['Start', 'START'],
          ['Left Stick Button', 'LEFT_STICK_BUTTON'],
          ['Right Stick Button', 'RIGHT_STICK_BUTTON']
        ]), "BUTTON");
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([
            ['is down', 'IS_DOWN'],
            ['Pressed', 'WAS_PRESSED'],
            ['Released', 'WAS_RELEASED']]), 'ACTION');
      this.setOutput(true, 'Boolean');
      this.setStyle(MRC_STYLE_DRIVER_STATION);
    },
  };
};

function getMethodFromButton(button: string): string {
  switch (button) {
    case 'A':
      return 'getA';
    case 'B':
      return 'getB';
    case 'X':
      return 'getX';
    case 'Y':
      return 'getY';
    case 'LEFT_BUMPER':
      return 'getLeftBumper';
    case 'RIGHT_BUMPER':
      return 'getRightBumper';
    case 'BACK':
      return 'getBack';
    case 'START':
      return 'getStart';
    case 'LEFT_STICK_BUTTON':
      return 'getLeftStickButton';
    case 'RIGHT_STICK_BUTTON':
      return 'getRightStickButton';
    default:
      return '';
  }
}

export const pythonFromBlock = function(
    block: Blockly.Block,
    _: PythonGenerator,
) {
  // TODO: Update this when the actual driver station display class is implemented
  let code = 'DriverStation.gamepads[' + block.getFieldValue(GAMEPAD_NUMBER_FIELD) + '].' 
          + getMethodFromButton(block.getFieldValue('BUTTON'));
    switch (block.getFieldValue('ACTION')) {
      case 'IS_DOWN':
        code += '';
        break;
      case 'WAS_PRESSED':
        code += 'Pressed';
        break;
      case 'WAS_RELEASED':
        code += 'Released';
        break;
    }
    return code + '()'
}