import { updateReadme, deleteReadme } from './readme';
import { createFolder, renameFolder } from './folder';
import importSource from './importSource';
import { uploadFiles } from './uploadFiles';

/** 
 * Wraps all operations into one object so that 
 * we can import them in one go.
 */
export default {
  updateReadme,
  deleteReadme,
  createFolder,
  renameFolder,
  importSource,
  uploadFiles
};