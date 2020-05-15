import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import { keys } from '../store/initialState';
import {
  MODE, PUZZLE_KEYS,
  EMPTY_CELL_VALUE,
  NO_CELL_SELECTED,
  DIMENSION,
} from '../../constants';

import {
  getColumnIndex,
  getRowIndex,
  getCoordinateSlug,
  coordinatesMatch,
} from '../../util/coordinates';
import isEqual from '../../util/isEqual';
import {
  extractPuzzleValue, NO_NOTES, NO_PUZZLE, PUZZLE_VARIANTS,
} from './helpers';

// create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual,
);
const _coordsPassthrough = (_:any, coords:number[]) => coords;
const _mode = (store:any) => store[keys.MODE];
const _puzzle = (store:any) => store[keys.PUZZLE];
const _selected = (store:any) => store[keys.SELECTED_CELL];
const _notes = (store:any) => store[keys.NOTES];
const _stats = (store:any) => store[keys.STATS];
const _flash = (store:any) => store[keys.FLASH];
const valuePass = (x:any) => x;

export const getMode = createSelector([_mode], valuePass);
export const isNotationMode = createSelector([_mode], (mode) => mode === MODE.NOTE);
export const boardIsLoading = createSelector([_mode], (mode) => mode === MODE.LOAD);

export const getPuzzle = createDeepEqualSelector([_puzzle], valuePass);
export const getUserPuzzle = createSelector([_puzzle], (puzzle) => puzzle[PUZZLE_KEYS.USER]);
export const getInitialPuzzle = createSelector([_puzzle], (puzzle) => puzzle[PUZZLE_KEYS.INITIAL]);
export const getSolutionPuzzle = createSelector([_puzzle], (puzzle) => puzzle[PUZZLE_KEYS.SOLUTION]);
export const getDifficulty = createSelector([_puzzle], (puzzle) => puzzle[PUZZLE_KEYS.DIFFICULTY]);

// state,coords => {puzzle}
export const getValueAtCell = createDeepEqualSelector(
  [getUserPuzzle, getInitialPuzzle, getSolutionPuzzle,
    _coordsPassthrough],
  (user, initial, solution, coords) => {
    if (coordinatesMatch(coords, NO_CELL_SELECTED)) {
      return NO_PUZZLE;
    }
    const row = getRowIndex(coords);
    const col = getColumnIndex(coords);
    const base = PUZZLE_VARIANTS;
    base.initial = initial[row][col];
    base.solution = solution[row][col];
    base.user = user[row][col];
    return base;
  },
);
// store, coords => string
export const getUserValueAtCell = createSelector(
  [getUserPuzzle, _coordsPassthrough],
  (user, coords) => extractPuzzleValue(user, coords),
);

export const getSelectedCell = createSelector([_selected], valuePass);

// store, coords => string
export const getSelectedValue = createSelector(
  [getUserPuzzle, getSelectedCell],
  (user, coords) => extractPuzzleValue(user, coords),
);

// store,coords => bool
export const userValueMatchesSelectedValue = createDeepEqualSelector(
  [getUserValueAtCell, getSelectedValue],
  (userValue:string, selectedValue:string) => {
    if (selectedValue === EMPTY_CELL_VALUE || userValue === EMPTY_CELL_VALUE) return false;
    return userValue === selectedValue;
  },
);

export const makeIsSelectedCell = createDeepEqualSelector(
  [getSelectedCell, _coordsPassthrough],
  (selectedCell, coords) => coordinatesMatch(selectedCell, coords),
);

export const shouldShowErrors = createSelector([], () => true); // @todo for controls

// (state,coords) => []
export const getCellNotes = createDeepEqualSelector(
  [_notes, _coordsPassthrough],
  (noteStore:any, coords:number[]) => {
    const slug = getCoordinateSlug(coords);
    const notes = noteStore[slug];
    return notes === undefined ? NO_NOTES : notes;
  },
);

// store, coords => bool
export const notesMatchSelectedValue = createDeepEqualSelector(
  [_notes, getSelectedCell, getUserPuzzle, _coordsPassthrough],
  (noteStore, selected, user, coords) => {
    const slug = getCoordinateSlug(coords);
    const notes = noteStore[slug];
    if (notes === undefined) return false;
    const selectedValue = extractPuzzleValue(user, selected);
    const index = parseInt(selectedValue, 10);
    const notesMatch = Number.isNaN(index) ? false : notes[index - 1];
    return notesMatch;
  },
);

export const puzzleIsComplete = createSelector([_stats], (stats) => stats.filled === DIMENSION * DIMENSION);

export const getFlashCells = createSelector([_flash], valuePass);

export const cellInFlashList = createDeepEqualSelector([_flash, _coordsPassthrough], (flashes, coords) => {
  const slug = getCoordinateSlug(coords);
  return flashes.includes(slug);
});
