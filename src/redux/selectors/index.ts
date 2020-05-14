import { createSelector } from 'reselect';
import { keys } from '../store/initialState';
import {
  MODE, PUZZLE_KEYS,
  EMPTY_CELL_VALUE,
  DIMENSION,
} from '../../constants';
import {
  getColumnIndex,
  getRowIndex,
  getCoordinateSlug,
  coordinatesMatch,
} from '../../util/coordinates';

export const getMode = (store:any) => store[keys.MODE];

export const isNotationMode = (store:any) => getMode(store) === MODE.NOTE;

export const boardIsLoading = (store:any) => getMode(store) === MODE.LOAD;

export const getPuzzle = (store:any) => store[keys.PUZZLE];
export const getUserPuzzle = (store:any) => getPuzzle(store)[PUZZLE_KEYS.USER];

export const getDifficulty = createSelector(
  [getPuzzle],
  (puzzle) => puzzle[PUZZLE_KEYS.DIFFICULTY],
);


export const getValueAtCell = (store:any) => (coords:number[]) => {
  const puzzle = getPuzzle(store);
  const row = getRowIndex(coords);
  const col = getColumnIndex(coords);
  if ([row, col].includes(-1)) {
    return {
      [PUZZLE_KEYS.INITIAL]: undefined,
      [PUZZLE_KEYS.USER]: undefined,
      [PUZZLE_KEYS.SOLUTION]: undefined,
    };
  }
  return {
    [PUZZLE_KEYS.INITIAL]: puzzle[PUZZLE_KEYS.INITIAL][row][col],
    [PUZZLE_KEYS.USER]: puzzle[PUZZLE_KEYS.USER][row][col],
    [PUZZLE_KEYS.SOLUTION]: puzzle[PUZZLE_KEYS.SOLUTION][row][col],
  };
};
export const makeUserValueAtCell = (coords:number[]) => createSelector([getValueAtCell], ((getValueFn) => getValueFn(coords)[PUZZLE_KEYS.USER]));

export const getSelectedCell = (store:any) => store[keys.SELECTED_CELL];
export const getSelectedValue = createSelector(
  [getSelectedCell, (store:any) => store],
  (coords:number[], store:any) => {
    const selectedValue = makeUserValueAtCell(coords)(store);
    return selectedValue;
  },
);

export const makeUserValueMatchesSelectedValue = (coords:number[]) => createSelector(
  [makeUserValueAtCell(coords), getSelectedValue],
  (userValue:string, selectedValue:string) => {
    if (selectedValue === EMPTY_CELL_VALUE || userValue === EMPTY_CELL_VALUE) return false;
    const matches = userValue === selectedValue;
    return matches;
  },
);
export const makeIsSelectedCell = (coords:number[]) => createSelector(
  [getSelectedCell],
  (selectedCell) => coordinatesMatch(selectedCell, coords),
);

export const shouldShowErrors = () => true; // @todo for controls

export const makeCellNotes = (coords:number[]) => (store:any) => {
  const slug = getCoordinateSlug(coords);
  return store[keys.NOTES][slug] || [];
};

export const puzzleIsComplete = (store:any) => store[keys.STATS].filled === DIMENSION * DIMENSION;

export const getFlashCells = (store:any) => store[keys.FLASH];
export const cellInFlashList = (coords:number[]) => (store:any) => {
  const flashes = getFlashCells(store);
  const slug = getCoordinateSlug(coords);
  return flashes.includes(slug);
};
