import { MODE, NO_CELL_SELECTED } from '../../constants'

export const keys = {
  MODE: 'mode',
  PUZZLE: 'puzzle',
  SELECTED_CELL: 'selected_cell',

  SIBLINGS: 'siblings',
  STATS: 'stats',
  NOTES: 'notes',
}

export const initialState = {
  [keys.MODE]: MODE.LOAD,
  [keys.PUZZLE]: {
    initial: undefined,
    user:undefined,
    solution: undefined,
    difficulty: undefined
  },
  [keys.SELECTED_CELL]: NO_CELL_SELECTED,
  [keys.SIBLINGS]: {},
  [keys.STATS]: {
    errorsMade: 0,
    startTime: undefined,
    filled: 0,
    complete: false,
    // needed: 0, // fill in when loading the puzzle
  },
  [keys.NOTES]: {}
}
// errors: coordslug[]
// winconditions: 0 unfilled, 0 wrong 
// stats: errors made, start time, 
// siblings: value: coords[]
// notes: coordslug: value[]