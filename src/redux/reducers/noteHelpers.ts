
// notes are 9-element arrays in a repo keyed by coordinate slugs

const createNoteStore = () => new Array(9).fill(false);

export const getNotesForCell = (repo:any, slug:string) => {
  const current = repo[slug];
  return current === undefined ? createNoteStore() : current;
};

const valueToIndex = (value:string) => parseInt(value, 10) - 1;

const cellHasNoteValue = (noteStore:boolean[], value:string) => {
  const result = noteStore[valueToIndex(value)];
  return result;
};

const setNoteValue = (noteStore:boolean[], value:string, hasNote:boolean = true) => {
  const newStore = [...noteStore];
  newStore[valueToIndex(value)] = hasNote;
  return newStore;
};

const clearNoteValue = (noteStore:boolean[], value:string) => setNoteValue(noteStore, value, false);

export const toggleNoteValue = (noteStore:boolean[], value:string) => {
  if (cellHasNoteValue(noteStore, value)) {
    return clearNoteValue(noteStore, value);
  }
  return setNoteValue(noteStore, value);
};
export const cellHasNotes = (noteStore:boolean[]) => noteStore.filter((i) => i === true).length > 0;
