import * as types from '../actions/actionTypes'
import { initialState, keys } from '../store/initialState'
import { Action } from '../../types/action'
import { parseBoardConfig, outOfBounds } from '../../util/parseBoard'
import { modeIsNotation } from '../../util/mode';
import { cloneObject } from '../../util/object';
import { composeNewState, userIsCorrect } from './puzzleHelper';

export const setPuzzleReducer = (state:any,{type, payload, meta}:Action) => {
  const { initial, solution, difficulty } = cloneObject(payload)
  const base = parseBoardConfig(initial)
  const user = parseBoardConfig(initial)
  return {
    difficulty,
    initial: base,
    user: user,
    solution: parseBoardConfig(solution)
  }
}

export const setCellReducer = (state:any,action:Action) => {
  const { payload, meta } = action;
  const { selected } = meta; 
  // if we are in note mode, this is the wrong reducer
  if(modeIsNotation(action)){
    return state; 
  }
  // if the user has already gotten the right answer, don't let it change
  if(userIsCorrect(state,selected)){
    return state;
  }
  // if there is no selected cell or that cell is out of bounds, return state
  if(!selected || outOfBounds(selected)){
    return state;
  }
  // selected cell is in bounds and different than initial
  return composeNewState(state,selected,payload)
}

const puzzleReducer = (state=initialState[keys.PUZZLE], action:Action) => {
  const {type } = action
  switch(type){
    case types.SET_PUZZLE:{
      return setPuzzleReducer(state,action);
    }
    case types.SET_CELL_VALUE:{
      return setCellReducer(state,action)
    }
  }
  return state;
};

export default puzzleReducer;
