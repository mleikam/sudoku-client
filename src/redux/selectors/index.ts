import { keys } from '../store/initialState'
import { 
  MODE, PUZZLE_KEYS , CELL_DISPLAY_FLAGS, 
  CLEAR_CELL_VALUE, EMPTY_CELL_VALUE, 
  DIMENSION 
} from '../../constants'
import { 
  getColumnIndex, 
  getRowIndex, 
  getCoordinateSlug, 
  coordinatesMatch 
} from '../../util/coordinates';

const { HIGHLIGHT, SELECTED, NOTES_HIGHLIGHT, FLASH_HIGHLIGHT } = CELL_DISPLAY_FLAGS; 

export const getMode = (store:any) => store[keys.MODE];

export const isNotationMode = (store:any) => getMode(store) === MODE.NOTE;

export const boardIsLoading = (store:any) => getMode(store) === MODE.LOAD;

export const getPuzzle = (store:any) => store[keys.PUZZLE]
export const getUserPuzzle = (store:any) => getPuzzle(store)[PUZZLE_KEYS.USER];

export const getSelectedCell = (store:any) => store[keys.SELECTED_CELL]

export const getValueAtCell = (store:any) => (coords:number[]) => {
  const puzzle = getPuzzle(store);
  const row = getRowIndex(coords);
  const col = getColumnIndex(coords);
  if( [row,col].includes(-1) ){
    return {
      [PUZZLE_KEYS.INITIAL]: undefined,
      [PUZZLE_KEYS.USER]: undefined,
      [PUZZLE_KEYS.SOLUTION]: undefined
    }
  }
  return {
    [PUZZLE_KEYS.INITIAL]: puzzle[PUZZLE_KEYS.INITIAL][row][col],
    [PUZZLE_KEYS.USER]: puzzle[PUZZLE_KEYS.USER][row][col],
    [PUZZLE_KEYS.SOLUTION]: puzzle[PUZZLE_KEYS.SOLUTION][row][col]
  }
}

export const shouldShowErrors = (store:any) => true; // @todo for controls

export const getCellNotes = (store:any) => (coords:number[]) => {
  const slug = getCoordinateSlug(coords); 
  return store[keys.NOTES][slug]
}

export const puzzleIsComplete = (store:any) => {
  return store[keys.STATS].filled === DIMENSION*DIMENSION;
}

const isHighlighted = (values:any,selectedValue:string) => {
  // return (values.user === selectedValue && selectedValue !==EMPTY_CELL_VALUE);
  return (
    values.user === selectedValue && 
    [EMPTY_CELL_VALUE,CLEAR_CELL_VALUE].includes(selectedValue)===false
  );
}

const cellHasMatchingNote = (store:any,coords:number[],value:string) => {
  const index = parseInt(value,10)-1
  const noteStore = getCellNotes(store)(coords)
  const hasNote = noteStore===undefined ? false : noteStore[index]
  return hasNote
}

export const getCellFlags = (store:any) => {
  const getValueAt = getValueAtCell(store);
  const showErrors = shouldShowErrors(store);
  const selectedCell: number[] = getSelectedCell(store); 
  const selectedValue: string = getValueAt(selectedCell)[PUZZLE_KEYS.USER];
  return (coords:number[])  => {
    const values =  getValueAt(coords);
    return ({
      ...values,
      [HIGHLIGHT]: (coordinatesMatch(coords,selectedCell)===false && isHighlighted(values,selectedValue) ),
      [NOTES_HIGHLIGHT]: cellHasMatchingNote(store,coords,selectedValue),
      [SELECTED]: selectedCell,
      [FLASH_HIGHLIGHT]: cellInFlashList(store)(coords),
      showErrors,
    })
  }
}

export const getFlashCells = (store:any) => {
  return store[keys.FLASH]
}
export const cellInFlashList = (store:any) => (coords:number[]) => {
  const flashes = getFlashCells(store);
  const slug = getCoordinateSlug(coords);
  return flashes.includes(slug)
}

