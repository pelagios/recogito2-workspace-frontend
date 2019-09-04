import { createFolder, renameFolder } from './folder';
import { uploadFiles, importSource } from './importing';
import { entityRecognition } from './ner';
import { updateReadme, deleteReadme } from './readme';
import { moveSelection } from './move';
import { deleteSelection, duplicateSelection } from './selection';
import { shareSelection } from './sharing';
import { exploreNetwork } from './network';

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
  moveSelection,
  duplicateSelection,
  shareSelection,
  exploreNetwork,
  entityRecognition
};