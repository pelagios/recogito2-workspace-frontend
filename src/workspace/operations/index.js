import { createFolder, renameFolder } from './folder';
import { uploadFiles, importSource } from './importing';
import { updateReadme, deleteReadme } from './readme';
import { deleteSelection } from './selection';

/** 
 * Wraps all operations into one object so that 
 * we can import them in one go.
 */
export default {
  createFolder,
  renameFolder,
  uploadFiles,
  importSource,
  updateReadme,
  deleteReadme,
  deleteSelection
};