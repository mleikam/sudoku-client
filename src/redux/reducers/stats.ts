import * as types from '../actions/actionTypes';
import { initialState, keys, statKeys } from '../store/initialState';
import { Action } from '../../types/action';
import { cloneObject } from '../../util/object';
import { EMPTY_CELL_VALUE } from '../../constants';
import { modeIsNotation } from '../../util/mode';

const increment = (obj:any, attr:string, n:number = 1) => {
  if (obj[attr] === undefined) return n;
  const newObject = { ...obj };
  newObject[attr] = obj[attr] + n;
  return newObject[attr];
};

const getPrefilledCount = (initial:any) => initial.match(/[^.]/g).length;

const setPuzzleReducer = (state:any, prefilledCount:number) => ({
  ...state,
  [statKeys.FILLED]: increment(state, statKeys.FILLED, prefilledCount),
  [statKeys.START]: new Date().toLocaleString(),
});

const cellValueReducer = (state:any, isCorrect:boolean) => {
  if (isCorrect) {
    return {
      ...state,
      [statKeys.FILLED]: increment(state, statKeys.FILLED),
    };
  }
  return {
    ...state,
    [statKeys.ERRORS]: increment(state, statKeys.ERRORS),
  };
};

const statisticsReducer = (state = initialState[keys.STATS], action:Action) => {
  const { type, payload, meta } = action;
  const newState = cloneObject(state);
  switch (type) {
    case types.SET_PUZZLE: {
      const prefilledCount = getPrefilledCount(payload.initial);
      return setPuzzleReducer(newState, prefilledCount);
    }
    case types.SET_CELL_VALUE: {
      if (modeIsNotation(action)) {
        return state;
      }
      if (payload === EMPTY_CELL_VALUE) {
        return state;
      }
      return cellValueReducer(newState, meta.correct);
    }
  }
  return state;
};

export default statisticsReducer;
