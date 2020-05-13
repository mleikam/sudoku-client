import * as types from './actionTypes'
import { MODE } from '../../constants';

export const loadPuzzle = () => ({
  type: types.LOAD_PUZZLE,
  payload: {}
})

export const updatePuzzle = (p:any) => {
  return ({
    type: types.SET_PUZZLE,
    payload: p
  })
}

export const loadSuccessful = () => ({
  type: types.SET_MODE,
  payload: MODE.ENTER
})

export const setMode = (mode:string) => ({
  type: types.SET_MODE,
  payload: mode
})

export const setCellValue = (selectedCell:number[],value:string) => ({
  type: types.SET_CELL_VALUE,
  payload: value,
  meta: {
    selected: selectedCell
  }
})

export const setSelectedCell = (config:number[]) => ({
  type: types.SET_SELECTED_CELL,
  payload: config,
  meta: {}
})

export const showBlocked = (cells:string[]) => ({
  type: types.SET_FLASH_CELL,
  payload: cells,
})

export const clearBlocked = () => ({
  type: types.CLEAR_FLASH_CELL,
  payload: null,
})
