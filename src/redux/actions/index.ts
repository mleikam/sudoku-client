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

export const setCellValue = (selectedCell:number[],value:string) => ({
  type: types.SET_CELL_VALUE,
  payload: value,
  meta: selectedCell
})

export const setSelectedCell = (config:number[]) => ({
  type: types.SET_SELECTED_CELL,
  payload: config
})
