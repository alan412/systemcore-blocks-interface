import * as Blockly from 'blockly/core';

import * as toolboxItems from './items';
import { Editor } from '../editor/editor';
import { BLOCK_NAME as MRC_DISPLAY_ADD_DATA  } from '../blocks/mrc_display_add_data';
import { BLOCK_NAME as MRC_GAMEPAD_BOOLEAN  } from '../blocks/mrc_gamepad_boolean';
import { BLOCK_NAME as MRC_GAMEPAD_ANALOG  } from '../blocks/mrc_gamepad_analog';

export function getDriverStationCategory(editor: Editor): toolboxItems.Category {
    return new toolboxItems.Category(
              Blockly.Msg['MRC_CATEGORY_DRIVER_STATION'],
              [
                getDriverStationDisplayCategory(editor),
                getDriverStationGamepadsCategory(editor),
              ],
              toolboxItems.ExpandedState.EXPANDED);
}

function getDriverStationDisplayCategory(editor: Editor): toolboxItems.Category {
    return new toolboxItems.Category(
              Blockly.Msg['MRC_CATEGORY_DRIVER_STATION_DISPLAY'],
              [
                new toolboxItems.Block(MRC_DISPLAY_ADD_DATA, null, null, null),
              ],
              toolboxItems.ExpandedState.EXPANDED);
}
function getDriverStationGamepadsCategory(editor: Editor): toolboxItems.Category {
    return new toolboxItems.Category(
              Blockly.Msg['MRC_CATEGORY_DRIVER_STATION_GAMEPADS'],
              [
                new toolboxItems.Block(MRC_GAMEPAD_BOOLEAN, null, null, null),
                new toolboxItems.Block(MRC_GAMEPAD_ANALOG, null, null, null),
              ],
              toolboxItems.ExpandedState.EXPANDED);
}