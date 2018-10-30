export const COLUMNS = [
  // Aggregate fields
  // 'agg_document',

  // Common fields
  'author',
  'title',
  'language',
  'date_freeform',
  'uploaded_at',
  'last_edit_at',
  'last_edit_by',
  'annotations',
  'public_visibility',
  // 'status_ratio',
  // 'activity',

  // Shared with me
  // 'owner',
  // 'shared_by',
  // 'access_level'
]

// Labels to use for fields
export const HEADER_NAMES = {
  // agg_document    : 'Document',

  author            : 'Author',
  title             : 'Title',
  language          : 'Language',
  date_freeform     : 'Date',
  uploaded_at       : 'Uploaded at',
  last_edit_at      : 'Last edit',
  last_edit_by      : 'Last edit by',
  annotations       : 'Annotations',
  public_visibility : 'Visibility',
  status_ratio      : 'Verification ratio',
  activity          : 'Activity graph',

  owner             : 'Document owner',
  shared_by         : 'Shared by',
  access_level      : 'Access level'
}

// Relative width requirements per column (XL, L, M, S)
export const COLUMN_WIDTH = {
  agg_document    : 'XL',

  author            : 'M',
  title             : 'L',
  language          : 'M',
  date_freeform     : 'M',
  uploaded_at       : 'M',
  last_edit_at      : 'M',
  last_edit_by      : 'M',
  annotations       : 'M',
  public_visibility : 'M',
  status_ratio      : 'M',
  activity          : 'M',

  owner             : 'M',
  shared_by         : 'M',
  access_level      : 'S'
}

export const AGGREGATE_COLUMNS = {
  agg_document: [ 'author', 'document' ]
}

// Static helper methods 
export class Columns {

  static getSpan(field) {
    const w = COLUMN_WIDTH[field];
    if (w == 'XL') 
      return 6;
    else if (w == 'L')
      return 4;
    else if (w == 'M')
      return 2;
    else if (w == 'S')
      return 1;
  }

  /** Expands agg_ columns to those that are required to build them **/
  static expandAggregatedColumns(columns) {
    return columns.reduce((result, field) => {
      if (field.startsWith('agg_'))
        result = result.concat(AGGREGATE_COLUMNS[field]);
      else
        // Just append
        result.push(field);

      return result;
    }, []);
  }

}