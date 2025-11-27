import { Editor } from '../editor/editor';
import * as toolboxItems from './items';
import * as Blockly from 'blockly/core';


export function getDriverStationCategory(editor: Editor): toolboxItems.Category {
  const contents: toolboxItems.ContentsType[] = [];

  // Get all controllers from the editor/project
  const controllers = getControllersFromProject(editor);
  
  // Add each controller as a category item
  controllers.forEach((controller) => {
    contents.push(controller);
  });

  // Add the "+ Controller" button to allow adding new controllers
  contents.push({
    kind: 'category',
    name: Blockly.Msg['MRC_CATEGORY_ADD_CONTROLLER'],
    contents: getAddControllerBlocks(editor),
  });

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
function getControllersFromProject(editor: Editor): toolboxItems.Category[] {
  // Placeholder - replace with actual implementation
  // This should retrieve controllers from the project/editor storage
  // For now, return empty array
  return [];
}

/**
 * Get blocks that can be added as new controllers
 * TODO: Implement available controller types
 */
function getAddControllerBlocks(editor: Editor): toolboxItems.Block[] {
  // Placeholder - replace with actual controller block types
  // This should return an array of available controller blocks that can be added
  // For example: Xbox controller, PlayStation controller, generic gamepad, etc.
  return [];
}

