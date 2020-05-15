import {
  getColumnIndex,
  getRowIndex,
  coordinatesMatch,
} from '../../util/coordinates';
import {
  EMPTY_CELL_VALUE,
  NO_CELL_SELECTED,
  DIMENSION, PUZZLE_KEYS,
} from '../../constants';
import { cloneObject } from '../../util/object';

export const extractPuzzleValue = (puzzleSlice:any, coords:number[]) => {
  if (coordinatesMatch(coords, NO_CELL_SELECTED)) {
    return EMPTY_CELL_VALUE;
  }
  const row = getRowIndex(coords);
  const col = getColumnIndex(coords);
  return String(puzzleSlice[row][col]);
};

const clonedKeys = cloneObject(PUZZLE_KEYS);

export const NO_NOTES = Array(DIMENSION).fill(false);
export const NO_PUZZLE = Object.keys(PUZZLE_KEYS).reduce((acc:any, key:any) => {
  const k = clonedKeys[key];
  acc[k] = undefined;
  return acc;
}, {});
const { difficulty, ...rest } = NO_PUZZLE;
export const PUZZLE_VARIANTS = rest;
