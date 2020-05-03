import * as types from '../actions/actionTypes'
import { initialState, keys } from '../store/initialState'
import { Action } from '../../types/action'
import { outOfBounds } from '../../util/parseBoard';
import { NO_CELL_SELECTED } from '../../constants';

const cellSelection = (state = initialState[keys.SELECTED_CELL], action:Action) => {
  const {type, payload} = action;
  switch(type){
    case types.SET_SELECTED_CELL:{
      const [row,column] = payload;
      if( NO_CELL_SELECTED[0] === row && NO_CELL_SELECTED[1] === column){
        return NO_CELL_SELECTED;
      }
      if( outOfBounds(payload) ){
        return state;
      }
      return payload
    }
  }
  return state;
};

export default cellSelection;
