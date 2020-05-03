import { keys } from '../store/initialState'
import { MODE } from '../../constants'
import { getColumnIndex, getRowIndex } from '../../util/coordinates';

export const getPuzzle = (store:any) => store[keys.PUZZLE]

export const boardIsLoading = (store:any) => {
  return store[keys.MODE] === MODE.LOAD
};

export const getSelectedCell = (store:any) => {
  // console.log('getSelectedCell',store[keys.SELECTED_CELL])
  return store[keys.SELECTED_CELL]
}

export const getValueAtCell = (puzzle:any,coords:number[]) => {
  const row = getRowIndex(coords);
  const col = getColumnIndex(coords);
  return {
    initial: puzzle.initial[row][col],
    user: puzzle.user[row][col],
    solution: puzzle.solution[row][col]
  }

}