export default class Selection {
    
  constructor(allItems, selection) {
    this._allItems = allItems;
    this._selection = selection;
  }

  clear() {
    this._selection = [];
  }

  isEmpty() {
    return this._selection.length === 0;
  }

  getSelectedItems() {
    return this._selection;
  }

  selectItem(item, isCtrlPressed) {
    const thisIdx = this._selection.indexOf(item);
    const isSelected = thisIdx > -1;

    if (isCtrlPressed) {
      // Toggle this item, leave the rest of the selection unchanged
      if (isSelected)
        this._selection.splice(thisIdx, 1);
      else
        this._selection.push(item);      
    } else {
      // Toggle state of this item and clear the rest of the selection
      this._selection = [ item ];
    }
  }

  /**
   * Range selection: SHIFT + click. 
   * 
   * Behavior follows Mac conventions, cf. 
   * https://stackoverflow.com/questions/2959887/algorithm-for-shift-clicking-items-in-a-collection-to-select-them
   */
  selectRange(toIdx) {
    const selectedIndices = this._selection.map(item => {
      return this._allItems.indexOf(item);
    });   
    
    const minIdx = Math.min.apply(null, selectedIndices);
    const maxIdx = Math.max.apply(null, selectedIndices);

    const isOutside = (toIdx > maxIdx) || (toIdx < minIdx);

    const slice = (from, to) => this._allItems.slice(from, to + 1);

    if (isOutside && toIdx > maxIdx)
      // Expand selection downwards
      this._selection = slice(minIdx, toIdx);
    else if (isOutside)
      // Expand selection upwards
      this._selection = slice(toIdx, maxIdx);
    else
      // Fill from topmost
      this._selection = slice(minIdx, toIdx);
  }

}