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
 * @author alan@porpoiseful.com (Alan Smith)
 */

import * as Blockly from 'blockly';
import { ExtendedPythonGenerator } from '../editor/extended_python_generator';
import { MRC_STYLE_CONTROLLERS } from '../themes/styles';

export const BLOCK_NAME = 'mrc_controller';
export const OUTPUT_NAME = 'mrc_controller_type';

export const CONTROLLER_TYPES: string[] = ['Joystick', 'Gamepad', 'GenericHID'];

export const CONTROLLER_DROPDOWN_OPTIONS: Blockly.MenuOption[] = CONTROLLER_TYPES.map((type => [type, type]));

type ControllerBlock = Blockly.Block & {
  mrcControllerName: string;
  mrcUsbPort: number;
  mrcControllerType: string;
};

type ControllerExtraState = {
  controllerName: string;
  usbPort: number;
  controllerType: string;
};

const USB_PORTS: Blockly.MenuOption[] = [
  ['0', '0'],
  ['1', '1'],
  ['2', '2'],
  ['3', '3'],
  ['4', '4'],
  ['5', '5'],
  ['6', '6'],
  ['7', '7']
];

export const CONTROLLER = {
  init: function (this: ControllerBlock) {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('controller1'), 'NAME')
        .appendField(Blockly.Msg.OF_TYPE)
        .appendField(new Blockly.FieldDropdown(CONTROLLER_DROPDOWN_OPTIONS), 'TYPE');
    this.appendDummyInput()
        .appendField(Blockly.Msg.USB)
        .appendField(new Blockly.FieldDropdown(USB_PORTS), 'USB_PORT');
    this.setStyle(MRC_STYLE_CONTROLLERS);
    this.setTooltip(Blockly.Msg.CONTROLLER_TOOLTIP);

    this.setPreviousStatement(true, OUTPUT_NAME);
    this.setNextStatement(true, OUTPUT_NAME);
  },

  /**
   * Save the controller information to the block's extra state.
   */
  saveExtraState: function (this: ControllerBlock): ControllerExtraState {
    const state: ControllerExtraState = {
      controllerName: this.getFieldValue('NAME'),
      usbPort: parseInt(this.getFieldValue('USB_PORT')),
      controllerType: this.getFieldValue('TYPE'),
    };

    return state;
  },

  /**
   * Load the controller information from the block's extra state.
   */
  loadExtraState: function (this: ControllerBlock, state: ControllerExtraState): void {
    this.setFieldValue(state.controllerName, 'NAME');
    this.setFieldValue(state.usbPort.toString(), 'USB_PORT');
    this.setFieldValue(state.controllerType, 'TYPE');

    this.mrcControllerName = state.controllerName;
    this.mrcUsbPort = state.usbPort;
    this.mrcControllerType = state.controllerType;
  },
};

export const setup = function () {
  Blockly.Blocks[BLOCK_NAME] = CONTROLLER;
};

export const pythonFromBlock = function (
    block: ControllerBlock,
    _generator: ExtendedPythonGenerator) {
  const controllerName = block.getFieldValue('NAME');
  const usbPort = block.getFieldValue('USB_PORT');
  const controllerType = block.getFieldValue('TYPE');

  const code = `${controllerName} = wpilib.${controllerType}(${usbPort})\n`;
  return code;
};
