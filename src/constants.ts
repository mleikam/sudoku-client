
export const MODE = {
  LOAD: 'LOAD',
  ENTER: 'ENTER',
  NOTE: 'NOTE',
};

export const FLASH_TIMEOUT = 1000; // ms

export const DIMENSION = 9;

export const EMPTY_CELL_VALUE = '.';
export const CLEAR_CELL_VALUE = '.'; // @TODO

export const NO_CELL_SELECTED = [-1, -1];

export const CELL_DISPLAY_FLAGS = {
  SELECTED: 'selected',
  CORRECT: 'correct',
  WRONG: 'wrong',
  LOCKED: 'locked',
  HIGHLIGHT: 'highlight',
  NOTES_HIGHLIGHT: 'notesHighlight',
  FLASH_HIGHLIGHT: 'flash',
};

export const PUZZLE_KEYS = {
  SOLUTION: 'solution',
  USER: 'user',
  INITIAL: 'initial',
  DIFFICULTY: 'difficulty',
};

export const GRID_CLASS_NAMES = {
  TOP: 'topBorder',
  BOTTOM: 'bottomBorder',
  LEFT: 'leftBorder',
  RIGHT: 'rightBorder',
};
