import Selection from './Selection';

export default {
  account: null,         // Null if not loaded
  
  view: 'MY_DOCUMENTS',  // MY_DOCUMENTS, SHARED_WITH_ME, SEARCH
  presentation: 'TABLE', // 'TABLE' or 'GRID'
  
  page: {
    breadcrumbs: null,
    readme: null,
    total_count: 0,
    items: []             // Folders and documents
  },

  selection: new Selection([]),        
  
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

  busy: true,            // If loading is in progress

  runningTasks: []
};