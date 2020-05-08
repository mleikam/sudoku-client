
import { CELL_DISPLAY_FLAGS, GRID_CLASS_NAMES, EMPTY_CELL_VALUE, PUZZLE_KEYS } from '../constants';
import { rowAndColumnMatchCoordinates } from '../util/coordinates';

const {TOP, BOTTOM, LEFT, RIGHT} = GRID_CLASS_NAMES; 
const { SELECTED, CORRECT, WRONG, HIGHLIGHT, NOTES_HIGHLIGHT } = CELL_DISPLAY_FLAGS; 
const { INITIAL, USER, SOLUTION} = PUZZLE_KEYS; 

export const getGridClassName = (row:number,col:number) => {
  const names = []
  if(row % 3 === 0){
    names.push(TOP)
  }
  if(row % 3 === 2){
    names.push(BOTTOM)
  }
  if(col % 3 === 0){
    names.push(LEFT)
  }
  if(col % 3 === 2){
    names.push(RIGHT)
  }
  return names.join(' ')
}

export const getClassNames = (
  row:number,
  col:number,
  value:string,
  flags: any
) => {
  const classes:string[] = []
  if(rowAndColumnMatchCoordinates(row,col,flags.selected)){
    classes.push(SELECTED)
  }
  if(flags.showErrors && flags[INITIAL] === EMPTY_CELL_VALUE){
    if( flags[SOLUTION]===value ){
      classes.push(CORRECT)
    } else if(flags[USER] !== EMPTY_CELL_VALUE) {
      classes.push(WRONG)
    } 
  }
  if( flags[HIGHLIGHT] ){
    classes.push(HIGHLIGHT)
  }
  if( flags[NOTES_HIGHLIGHT] ){
    classes.push(NOTES_HIGHLIGHT)
  }
  return classes.join(' ')
}

