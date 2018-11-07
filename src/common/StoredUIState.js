export default class StoredUIState {

  static load() {
    const state = {};

    const addIfDefined = (key) => {
      const value = localStorage.getItem(`r2.workspace.${key}`);
      if (value) state[key] = JSON.parse(value);
    }

    ['view', 'presentation', 'table_columns', 'table_sorting'].map(addIfDefined)

    return state;
  }

  static save(key, value) {
    const prefixed = `r2.workspace.${key}`
    localStorage.setItem(prefixed, JSON.stringify(value));
  }

}