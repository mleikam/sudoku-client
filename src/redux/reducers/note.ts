import * as types from '../actions/actionTypes'
import { initialState, keys } from '../store/initialState'
import { Action } from '../../types/action'
import { modeIsNormal } from '../../util/mode'
import { getCoordinateSlug } from '../../util/coordinates'
import { cloneObject } from '../../util/object';
import { getNotesForCell, toggleNoteValue, cellHasNotes } from './noteHelpers';
import { 
  // EMPTY_CELL_VALUE, 
  CLEAR_CELL_VALUE } from '../../constants'

const noteReducer = (state = initialState[keys.NOTES], action:Action) => {
  const { type, payload, meta } = action;
  switch(type){
    case types.SET_CELL_VALUE:{
      if(modeIsNormal(action)){ // wrong reducer
        return state; 
      }
      const { selected } = meta;
      const slug = getCoordinateSlug(selected)
      const newState = cloneObject(state);
//      if( payload === EMPTY_CELL_VALUE){ // delete all notes
      if( payload === CLEAR_CELL_VALUE){ // delete all notes
        return {
          ...newState,
          [slug]: undefined
        }
      }
      // toggle the given note value
      const noteStore = getNotesForCell(state,slug)
      const newNoteStore = toggleNoteValue(noteStore,payload);
      const hasNotes = cellHasNotes(newNoteStore)
      return {
        ...newState,
        [slug]: hasNotes ? newNoteStore : undefined
      }
    }
  }
  return state;
};

export default noteReducer;
