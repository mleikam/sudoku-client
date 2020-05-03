import { combineReducers } from 'redux'
import puzzle from './puzzle'
import mode from './mode'
import cellSelection from './cellSelection';
import { keys } from '../store/initialState';

export default combineReducers({
  [keys.PUZZLE]: puzzle,
  [keys.MODE]: mode,
  [keys.SELECTED_CELL]: cellSelection
})