import Selection from '../common/documents/Selection';

const DEFAULT_STATE = {
  me             : null, // Login identity
  visitedAccount : null, // Visited profile

  presentation   : 'TABLE',

  page: {
    breadcrumbs   : [],
    readme: null, 
    total_count: 0,
    items: []
  },

  selection: new Selection(),

  table_config  : {
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

  busy           : true
}

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