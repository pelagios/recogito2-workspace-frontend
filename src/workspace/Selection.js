export default class Selection {
    
  constructor(selectedItems) {
    this._selection = selectedItems;
  }

  isEmpty() {
    return this._selection.length === 0;
  }

  isSingleSelection() {
    return this._selection.length === 1;
  }

  isSingleFolder() {
    return this._selection.length === 1 && this._selection[0].type === 'FOLDER';
  }

  isSingleDocument() {
    return this._selection.length === 1 && this._selection[0].type === 'DOCUMENT';
  }

  includesText() {
    const withText = this._selection.filter(item => {
      return item.filetypes && item.filetypes.find(ft => ft.startsWith("TEXT"));
    });
    return withText.length > 0;
  }

  getItems() {
    return this._selection;
  }

  /** Immutable - returns a new selection object **/
  select = (item, isCtrlPressed) => {
    const nextSelection = this._selection.slice(0);

    const thisIdx = nextSelection.indexOf(item);
    const isSelected = thisIdx > -1;

    if (isCtrlPressed) {
      // Toggle this item, leave the rest of the selection unchanged
      if (isSelected)
        nextSelection.splice(thisIdx, 1);
      else
        nextSelection.push(item);      
    } else {
      // Select just this item
      nextSelection = [ item ];
    }

    return new Selection(nextSelection);
  }

  /**
   * Range selection: SHIFT + click. 
   * 
   * Behavior follows Mac conventions, cf. 
   * https://stackoverflow.com/questions/2959887/algorithm-for-shift-clicking-items-in-a-collection-to-select-them
   * 
   * Immutable - returns a new selection object
   */
  selectRange = (allItems, toIdx) => {
    const selectedIndices = this._selection.map(item => {
      return allItems.indexOf(item);
    });   
    
    const minIdx = Math.min.apply(null, selectedIndices);
    const maxIdx = Math.max.apply(null, selectedIndices);

    const isOutside = (toIdx > maxIdx) || (toIdx < minIdx);

    const slice = (from, to) => allItems.slice(from, to + 1);

    if (isOutside && toIdx > maxIdx)
      // Expand selection downwards
      return new Selection(slice(minIdx, toIdx));
    else if (isOutside)
      // Expand selection upwards
      return new Selection(slice(toIdx, maxIdx));
    else
      // Fill from topmost
      return new Selection(slice(minIdx, toIdx));
  }
  
}