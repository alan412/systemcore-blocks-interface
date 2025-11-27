import { Editor } from '../editor/editor';
import * as toolboxItems from './items';
import * as Blockly from 'blockly/core';
import { BLOCK_NAME as MRC_OPMODE_DETAILS } from '../blocks/mrc_opmode_details';
import { BLOCK_NAME as MRC_CONTROLLER } from '../blocks/mrc_controller';
import { findConnectedBlocksOfType } from '../blocks/utils/find_connected_blocks';


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
 */
function getControllersFromProject(editor: Editor): toolboxItems.Category[] {
  const workspace = editor.getBlocklyWorkspace();
  const categories: toolboxItems.Category[] = [];
  
  // Find the mrc_opmode_details block
  const opmodeDetailsBlocks = workspace.getBlocksByType(MRC_OPMODE_DETAILS);
  
  if (opmodeDetailsBlocks.length > 0) {
    const opmodeDetailsBlock = opmodeDetailsBlocks[0];
    
    // Find all mrc_controller blocks connected to the opmode details block
    const controllerBlocks = findConnectedBlocksOfType(opmodeDetailsBlock, MRC_CONTROLLER);
    
    // Create a category for each controller
    controllerBlocks.forEach((controllerBlock) => {
      const controllerName = controllerBlock.getFieldValue('NAME');
      
      categories.push({
        kind: 'category',
        name: controllerName,
        contents: [],
      });
    });
  }
  
  return categories;
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

