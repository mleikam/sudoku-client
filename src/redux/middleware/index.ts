import { getPuzzle } from '../../api';
import {
  updatePuzzle, showBlocked,
  clearBlocked,
} from '../actions';
import * as types from '../actions/actionTypes';
import { getValueAtCell, getMode } from '../selectors';
import {
  MODE, EMPTY_CELL_VALUE, CLEAR_CELL_VALUE, FLASH_TIMEOUT,
} from '../../constants';
import { getCoordinateSlug } from '../../util/coordinates';
import { getSiblings } from '../../util/parseBoard';

const puzzleLoader = (state:any) => (next:any) => (action:any) => {
  const { type } = action;
  if (type === types.LOAD_PUZZLE) {
    getPuzzle().then((puzzle:any) => {
      state.dispatch(updatePuzzle(puzzle));
    });
  }
  return next(action);
};

function logger(state:any) {
  return (next:any) => (action:any) => {
    console.group(action.type);
    console.log('action:', action);
    const returnValue = next(action);
    console.log('new state:', state.getState());
    console.groupEnd();
    return returnValue;
  };
}

const guessIsCorrect = (state:any) => (next:any) => (action:any) => {
  const { type, payload: guess, meta } = action;
  if (type === types.SET_CELL_VALUE && meta.mode === MODE.ENTER) {
    const { selected } = meta;
    const { solution, user } = getValueAtCell(state.getState())(selected);
    return next({
      ...action,
      meta: {
        ...action.meta,
        correct: (solution === guess && solution !== user),
      },
    });
  }
  return next(action);
};

const modeRouter = (state:any) => (next:any) => (action:any) => {
  const mode = getMode(state.getState());
  const { type } = action;
  if (type === types.SET_CELL_VALUE) {
    return next({
      ...action,
      meta: {
        ...action.meta,
        mode,
      },
    });
  }
  return next(action);
};

// if the value should not be allowed, rewrites the action
// @todo: use coord slugs
const valueIsBlocked = (state:any) => (next:any) => (action:any) => {
  const { type, meta, payload: value } = action;
  if (type === types.SET_CELL_VALUE && value !== CLEAR_CELL_VALUE) {
    const { selected } = meta;
    const { row, column, cage } = getSiblings(selected);
    const cellsToCheck = [...row, ...column, ...cage];
    const getValue = getValueAtCell(state.getState());
    const blockingCells:string[] = [];
    for (let i = 0; i < cellsToCheck.length; i++) {
      const cell = cellsToCheck[i];
      const { user } = getValue(cell);
      if (user === value) {
        blockingCells.push(getCoordinateSlug(cell));
      }
    }
    if (blockingCells.length > 0) {
      state.dispatch(showBlocked(blockingCells));
      setTimeout(() => {
        state.dispatch(clearBlocked());
      }, FLASH_TIMEOUT);
      return next({ ...action, payload: EMPTY_CELL_VALUE });
    }
  }
  return next(action);
};

const middleware = [
  puzzleLoader,
  modeRouter,
  guessIsCorrect,
  valueIsBlocked,
];

if (process.env.REACT_APP_LOGGING_ENABLED === 'true') {
  middleware.push(logger);
}

export default middleware;
