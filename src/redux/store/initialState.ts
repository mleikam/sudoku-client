import { MODE, NO_CELL_SELECTED } from '../../constants'

export const keys = {
  MODE: 'mode',
  PUZZLE: 'puzzle',
  SELECTED_CELL: 'selected_cell'
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
}
