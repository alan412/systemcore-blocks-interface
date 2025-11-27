import { Editor } from '../editor/editor';
import * as toolboxItems from './items';
import * as Blockly from 'blockly/core';


export function getDriverStationCategory(editor: Editor): toolboxItems.Category {
  const contents: toolboxItems.ContentsType[] = [];

  contents.push({
    kind: 'category',
    name: Blockly.Msg['MRC_CATEGORY_TELEMETRY'],
    contents: [],
  });

  // Get all controllers from the editor/project
  const controllers = getControllersFromProject(editor);
  
  contents.push({
    kind: 'category',
    name: Blockly.Msg['MRC_CATEGORY_CONTROLLERS'],
    contents: [
      {
        kind: 'category',
        name: Blockly.Msg['MRC_CATEGORY_ADD_CONTROLLER'],
        contents: getAddControllerBlocks(editor),
      },
      ...controllers
    ]
  })

  return {
    kind: 'category',
    name: Blockly.Msg['MRC_CATEGORY_DRIVER_STATION'],
    contents,
  };
}

/**
 * Get all controllers from the project
 * TODO: Implement actual controller retrieval from the project storage
 */
function getControllersFromProject(_editor: Editor): toolboxItems.Category[] {
  // Placeholder - replace with actual implementation
  // This should retrieve controllers from the project/editor storage
  // For now, return empty array
  return [];
}

/**
 * Get blocks that can be added as new controllers
 */
function getAddControllerBlocks(_editor: Editor): toolboxItems.ContentsType[] {
  const contents: toolboxItems.ContentsType[] = [];

  // Add a controller block for each type: Joystick, Gamepad, GenericHID
  contents.push({
    kind: 'block',
    type: 'mrc_controller',
    extraState: {
      controllerName: 'joystick1',
      usbPort: 0,
      controllerType: 'Joystick',
    },
  });

  contents.push({
    kind: 'block',
    type: 'mrc_controller',
    extraState: {
      controllerName: 'gamepad1',
      usbPort: 0,
      controllerType: 'Gamepad',
    },
  });

  contents.push({
    kind: 'block',
    type: 'mrc_controller',
    extraState: {
      controllerName: 'hid1',
      usbPort: 0,
      controllerType: 'GenericHID',
    },
  });

  return contents;
}

