import * as types from '../actions/actionTypes'
import { initialState, keys } from '../store/initialState'
import { Action } from '../../types/action'
import { BoardConfig } from '../../types/boardState';
import { parseBoardConfig, outOfBounds } from '../../util/parseBoard'
import { getValueAtCell } from '../selectors';
import { getColumnIndex, getRowIndex } from '../../util/coordinates';
import { EMPTY_CELL_VALUE } from '../../constants';

const destructurePayload = (payload:BoardConfig) => ({
  difficulty: payload.difficulty,
  initial: payload.initial,
  solution: payload.solution
})

const composeNewState = (state:any,selectedCell:number[],payload:string) => {
  console.log({user:state.user,selectedCell,payload})
  const newUserState = [...state.user]
  const row = getRowIndex(selectedCell)
  const col = getColumnIndex(selectedCell)
  newUserState[row][col] = payload
  return {
    ...state,
    user: newUserState
  }
}

const puzzleReducer = (state=initialState[keys.PUZZLE], action:Action) => {
  const {type,payload} = action
  switch(type){
    case types.SET_PUZZLE:{
      const { initial, solution, difficulty } = destructurePayload(payload)
      const base = parseBoardConfig(initial)
      const user = parseBoardConfig(initial)
      return {
        difficulty,
        initial: base,
        user: user,
        solution: parseBoardConfig(solution)
      }
    }
    case types.SET_CELL_VALUE:{
      const { meta: selectedCell } = action;
      // if there is no selected cell or that cell is out of bounds, return state
      if(!selectedCell || outOfBounds(selectedCell)){
        return state;
      }
      // if the cell is not empty in the initial set, return the state
      const values = getValueAtCell(state,selectedCell);
      if(values.initial !== EMPTY_CELL_VALUE){
        return state;
      }
      // selected cell is in bounds and different than initial
      return composeNewState(state,selectedCell,payload)
    }
  }
  return state;
};

export default puzzleReducer;
