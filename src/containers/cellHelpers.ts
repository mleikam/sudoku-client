import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  makeUserValueMatchesSelectedValue,
  getValueAtCell,
  makeIsSelectedCell,
  getSelectedValue, cellInFlashList,
} from '../redux/selectors';


import {
  EMPTY_CELL_VALUE, CLEAR_CELL_VALUE, CELL_DISPLAY_FLAGS, GRID_CLASS_NAMES, PUZZLE_KEYS,
} from '../constants';

const {
  TOP, BOTTOM, LEFT, RIGHT,
} = GRID_CLASS_NAMES;
const {
  SELECTED, CORRECT, WRONG,
  HIGHLIGHT, NOTES_HIGHLIGHT, FLASH_HIGHLIGHT,
} = CELL_DISPLAY_FLAGS;
const { INITIAL, USER, SOLUTION } = PUZZLE_KEYS;

export const getGridClassName = (row:number, col:number) => {
  const names = [];
  if (row % 3 === 0) {
    names.push(TOP);
  }
  if (row % 3 === 2) {
    names.push(BOTTOM);
  }
  if (col % 3 === 0) {
    names.push(LEFT);
  }
  if (col % 3 === 2) {
    names.push(RIGHT);
  }
  return names.join(' ');
};

export const getClassNames = (
  row:number,
  col:number,
  value:string,
  flags: any,
) => {
  const classes:string[] = [];
  if (flags.selected) {
    classes.push(SELECTED);
  }
  if (flags.showErrors && flags[INITIAL] === EMPTY_CELL_VALUE) {
    if (flags[SOLUTION] === value) {
      classes.push(CORRECT);
    } else if (flags[USER] !== EMPTY_CELL_VALUE) {
      classes.push(WRONG);
    }
  }
  if (flags[HIGHLIGHT]) {
    classes.push(HIGHLIGHT);
  }
  if (flags[NOTES_HIGHLIGHT]) {
    classes.push(NOTES_HIGHLIGHT);
  }
  if (flags[FLASH_HIGHLIGHT]) {
    classes.push(FLASH_HIGHLIGHT);
  }
  return classes.join(' ');
};

export const shouldShowNotes = (value:string, notes?:boolean[]) => (value === '.' && Array.isArray(notes));

export const cellHasMatchingNote = (noteStore:any, value:string) => {
  const index = parseInt(value, 10) - 1;
  const hasNote = noteStore === undefined ? false : noteStore[index];
  return hasNote;
};

export const useFlags = (coords:number[], value:string, notes:any) => {
  const matchSelector = makeUserValueMatchesSelectedValue(coords);
  const matches = useSelector(matchSelector);
  const values = useSelector((store:any) => getValueAtCell(store)(coords));
  const isSelected = useSelector(makeIsSelectedCell(coords));
  const selectedValue = useSelector(getSelectedValue);
  const inFlashList = useSelector(cellInFlashList(coords));
  const notesMatch = cellHasMatchingNote(notes, selectedValue);
  const selectedNotEmpty = [EMPTY_CELL_VALUE, CLEAR_CELL_VALUE].includes(selectedValue) === false;
  const highlight = !isSelected && matches && selectedNotEmpty;
  return useMemo(() => ({
    ...values,
    [HIGHLIGHT]: highlight,
    [NOTES_HIGHLIGHT]: notesMatch,
    [SELECTED]: isSelected,
    [FLASH_HIGHLIGHT]: inFlashList,
    showErrors: true,
  }), [highlight, notesMatch, isSelected, inFlashList, values]);
};
