import Selection from '../common/documents/Selection';

const DEFAULT_STATE = {
  account: null,         // Null if not loaded
  
  view: 'MY_DOCUMENTS',  // MY_DOCUMENTS, SHARED_WITH_ME, SEARCH
  presentation: 'TABLE', // 'TABLE' or 'GRID'

  search_scope: null,    // If view is SEARCH
  
  page: {
    breadcrumbs: null,
    readme: null,
    total_count: 0,
    items: []             // Folders and documents
  },

  selection: new Selection(),        
  
  table_config: {
    columns: [
      "author",
      "title",
      "language",
      "date_freeform",
      "uploaded_at",
      "last_edit_at"
    ],
    sorting: { by: null, asc: true } 
  },

  busy: true             // If loading is in progress
};

export const initialState = () => {

  const stored = {};

  // Helper
  const addIfDefined = (key) => {
    const value = localStorage.getItem(`recogito.workspace.${key}`);
    if (value) stored[key] = JSON.parse(value);
  }

  ['view', 'presentation', 'table_config'].map(addIfDefined)

  return { ...DEFAULT_STATE, ...stored };
}

export const persistState = (key, value) => {
  const prefixed = `recogito.workspace.${key}`
  localStorage.setItem(prefixed, JSON.stringify(value));
}

