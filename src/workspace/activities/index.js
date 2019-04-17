import createFolder from './createFolder';
import importSource from './importSource';
import uploadFiles from './uploadFiles';

/** 
 * Wraps all activities into one object so that 
 * we can import them in one go.
 */
export default {
  createFolder,
  importSource,
  uploadFiles
};