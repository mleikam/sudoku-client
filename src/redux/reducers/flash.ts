import * as types from '../actions/actionTypes'
import { initialState, keys } from '../store/initialState'
import { Action } from '../../types/action'

const flashReducer = (state = initialState[keys.FLASH], action:Action) => {
  const { type, payload:cells } = action;
  switch(type){
    case types.SET_FLASH_CELL:{
      // console.log('set flash cells',cells)
      return cells
    }
    case types.CLEAR_FLASH_CELL:{
      return []
    }
  }
  return state;
};

export default flashReducer;
