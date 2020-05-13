import { MODE, NO_CELL_SELECTED, PUZZLE_KEYS } from '../../constants'

export const keys = {
  MODE: 'mode',
  PUZZLE: 'puzzle',
  SELECTED_CELL: 'selected_cell',
  STATS: 'stats',
  NOTES: 'notes',
  FLASH: 'flash',
}

export const statKeys = {
  ERRORS: 'errorsMade',
  START: 'startTime',
  FILLED: 'filled',
}

export const puzzleKeys = {
  ...PUZZLE_KEYS,
  DIFFICULTY: 'difficulty',
}

export const initialState = {
  [keys.MODE]: MODE.LOAD,
  [keys.PUZZLE]: {
    [puzzleKeys.INITIAL]: undefined,
    [puzzleKeys.USER]:undefined,
    [puzzleKeys.SOLUTION]: undefined,
    [puzzleKeys.DIFFICULTY]: undefined
  },
  [keys.SELECTED_CELL]: NO_CELL_SELECTED,
  [keys.FLASH]: [],
  [keys.STATS]: {
    [statKeys.ERRORS]: 0,
    [statKeys.START]: undefined,
    [statKeys.FILLED]: 0,
  },
  [keys.NOTES]: {}
}
