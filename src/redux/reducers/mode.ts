import * as types from '../actions/actionTypes'
import { initialState, keys } from '../store/initialState'
import { Action } from '../../types/action'

const modeReducer = (state = initialState[keys.MODE], action:Action) => {
  const {type, payload} = action;
  switch(type){
    case types.SET_MODE:{
      return payload
    }
  }
  return state;
};

export default modeReducer;
