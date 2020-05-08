import { getPuzzle } from '../../api'
import { updatePuzzle } from '../actions'
import * as types from '../actions/actionTypes'
import { getValueAtCell, getMode } from '../selectors';
import { MODE } from '../../constants';

const puzzleLoader = (state:any) => (next:any) => (action:any) => {
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
  const { type, payload: guess, meta } = action;
  if(type===types.SET_CELL_VALUE && meta.mode===MODE.ENTER){
    const { selected } = meta; 
    const { solution, user } = getValueAtCell(state.getState())(selected)
    return next({
      ...action,
      meta: {
        ...action.meta,
        correct: (solution===guess && solution!==user),
      }
    })
  }
  return next(action);
}

const modeRouter = (state:any) => (next:any) => (action:any) => {
  const mode = getMode(state.getState())
  const { type  } = action;
  if(type===types.SET_CELL_VALUE){
    return next({
      ...action,
      meta: {
        ...action.meta,
        mode: mode
      }
    });
  }
  return next(action)
}

// const highlighter = (state:any) => (next:any) => (action:any) => {
//   const { type, payload: selected } = action;
//   if(type===types.SET_SELECTED_CELL){
//     const { user: userValue } = getValueAtCell(state.getState(),selected)
//     return next({
//       ...action,
//       meta: {
//         ...action.meta,
//         highlight: userValue
//       }
//     });
//   }
//   return next(action)
// }

export default [
  puzzleLoader,
  modeRouter,
  guessIsCorrect,
  // highlighter,
  logger
];