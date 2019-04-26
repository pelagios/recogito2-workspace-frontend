import { updateReadme, deleteReadme } from './readme';
import createFolder from './createFolder';
import importSource from './importSource';
import uploadFiles from './uploadFiles';

/** 
 * Wraps all operations into one object so that 
 * we can import them in one go.
 */
export default {
  updateReadme,
  deleteReadme,
  createFolder,
  importSource,
  uploadFiles
};