import styled from 'styled-components'
import { DIMENSION } from '../../constants';
import { CELL_DISPLAY_FLAGS, GRID_CLASS_NAMES } from '../../constants';

const {TOP, BOTTOM, LEFT, RIGHT} = GRID_CLASS_NAMES; 
const { 
  SELECTED, CORRECT, WRONG, LOCKED, HIGHLIGHT, 
  FLASH_HIGHLIGHT, 
  NOTES_HIGHLIGHT 
} = CELL_DISPLAY_FLAGS;

const cellSize = 40;
const borderSize = 1;
const minorGridColor = "#ccc"
const majorGridColor = '#666'

const gridWidth = (cellSize+borderSize*2)*(DIMENSION)
const gridHeight = (cellSize+borderSize*2)*(DIMENSION)

const normalColor = '#222';
const notesColor = '#3aa';

export const StyledGrid = styled.div` 
  border: 2px solid ${normalColor};
  width: ${gridWidth}px;
  height: ${gridHeight}px;
  background: #eee; 
  text-align:center;
  &.withNotes {
    border-color: ${notesColor};
  }
`;

export const StyledRow = styled.div`
  display:flex;
`;

export const StyledCellContainer = styled.div`
  width: ${cellSize}px; 
  height: ${cellSize}px;
  display: inline-block;
  border: ${borderSize}px solid ${minorGridColor}; 
  &.${TOP} {
    border-top-color: ${majorGridColor};
  }
  &.${BOTTOM} {
    border-bottom-color: ${majorGridColor};
  }
  &.${LEFT} {
    border-left-color: ${majorGridColor};
  }
  &.${RIGHT} {
    border-right-color: ${majorGridColor};
  }
`
const BaseCell = styled.div`
  width: ${cellSize}px; 
  height: ${cellSize}px;
  text-align: center;
  font-family: Arial,sans-serif;
  background-color: #fff;
  color: #222;
  &.${SELECTED} {
    // background-color: #ff0;
    background-color:     #d5ffaa    ;  
  }
`;

export const StyledCell = styled(BaseCell)`
  line-height: ${cellSize}px;
  font-size: ${cellSize*.8}px;
  cursor: pointer; 
  &.${LOCKED} {
    background-color: #fff;
    cursor: default;
  }
  &.${WRONG} {
    background-color: #a66;
  }
  &.${CORRECT} {
  };
  &.${HIGHLIGHT}:not(.${WRONG}) {
    background-color: #ffd5aa;
  }
  &.${FLASH_HIGHLIGHT} {
    background-color: #faa; 
  }
`;

export const StyledNotes = styled(BaseCell)`
  & > span {
    color: ${notesColor}; 
    width: ${cellSize/3}px;
    height: ${cellSize/3}px;
    display: inline-block;
    float:left;
    line-height: ${cellSize/3*.8}px;
    font-size: ${cellSize/3*.8}px;
  }
  &.${NOTES_HIGHLIGHT} {
    background-color: #ffa;
  }  
`