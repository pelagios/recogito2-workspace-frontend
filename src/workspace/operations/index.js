import { createFolder, renameFolder } from './folder';
import { uploadFiles, importSource } from './importing';
import { entityRecognition } from './ner';
import { updateReadme, deleteReadme } from './readme';
import { deleteSelection, duplicateSelection } from './selection';
import { shareSelection } from './sharing';

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
  deleteSelection,
  duplicateSelection,
  shareSelection,
  entityRecognition
};