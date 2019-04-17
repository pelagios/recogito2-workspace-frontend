export default {
  account: null,         // Null if not loaded
  view: null,            // MY_DOCUMENTS, SHARED_WITH_ME, SEARCH
  presentation: 'TABLE', // 'TABLE' or 'GRID'
  
  page: {
    breadcrumbs: null,
    readme: null,
    total_count: 0,
    items: []             // Folders and documents
  },

  selection: [],        
  
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

  busy: false,           // If loading is in progress

  runningTasks: []
};