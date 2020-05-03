import { getPuzzle } from '../../api'
import { updatePuzzle } from '../actions'
import * as types from '../actions/actionTypes'
import { getValueAtCell } from '../selectors';

const puzzle = (state:any) => (next:any) => (action:any) => {
  const { type } = action;
  if(type===types.LOAD_PUZZLE){
    getPuzzle().then((puzzle:any) => {
      state.dispatch( updatePuzzle(puzzle) )
    })
  }
  return next(action);
}

function logger(state:any) {
  return (next:any) => (action:any) => {
    console.group(action.type)
    console.log('action:',action)
    const returnValue = next(action)
    console.log('new state:',state.getState())
    console.groupEnd();
    return returnValue
  }
}

const guessIsCorrect = (state:any) => (next:any) => (action:any) => {
  const { type, payload: guess } = action;
  if(type===types.SET_CELL_VALUE){
    const { meta: selectedCell } = action;
    const values = getValueAtCell(state.getState().puzzle,selectedCell)
    // console.log({values})
    const { solution: correct} = values
    console.warn('correct?',correct===guess,selectedCell,correct)
  }
  return next(action);
}

const boardComplete = (state:any) => (next:any) => (action:any) => {
  const { type } = action;
  // if(type===types.LOAD_PUZZLE){
  //   getPuzzle().then((puzzle:any) => {
  //     state.dispatch( updatePuzzle(puzzle) )
  //   })
  // }
  return next(action);
}

export default [puzzle,guessIsCorrect,boardComplete,logger];