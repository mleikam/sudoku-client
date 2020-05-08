import { combineReducers } from 'redux'
import { keys } from '../store/initialState';

import puzzle from './puzzle'
import mode from './mode'
import cellSelection from './cellSelection';
import statistics from './stats'
import notes from './note'

export default combineReducers({
  [keys.PUZZLE]: puzzle,
  [keys.MODE]: mode,
  [keys.SELECTED_CELL]: cellSelection,
  [keys.STATS]: statistics,
  [keys.NOTES]: notes,
})