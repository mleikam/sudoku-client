import * as types from '../actions/actionTypes'
import { initialState, keys } from '../store/initialState'
import { Action } from '../../types/action'
import { cloneObject } from '../../util/object';
import { EMPTY_CELL_VALUE } from '../../constants';
import { modeIsNotation } from '../../util/mode'

const increment = (obj:any,attr:string,n:number=1) => {
  if(obj[attr]===undefined) return n
  return obj[attr] += n
}

const statisticsReducer = (state = initialState[keys.STATS], action:Action) => {
  const {type, payload, meta} = action;
  const oldState = cloneObject(state);
  switch (type) {
    case types.SET_PUZZLE: { 
      const prefilledCount = payload.initial.match(/[^.]/g).length
      return {
        ...oldState,
        filled: increment(oldState,'filled',prefilledCount),
        startTime: new Date().toLocaleString()
      }
    }
    case types.SET_CELL_VALUE:{
      if(modeIsNotation(action)){
        return state; 
      }
      if(payload === EMPTY_CELL_VALUE){
        return state;
      }
      if(meta.correct){
        return {
          ...oldState,
          filled: increment(oldState,'filled'),
        }
      } else {
        return {
          ...oldState,
          errorsMade: increment(oldState,'errorsMade'),
        }
      }
    }
  }
  return state;
};

export default statisticsReducer;
