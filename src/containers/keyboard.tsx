import React from 'react';
import useEventListener from '../util/useEventListener'
import { setSelectedCell, setCellValue } from '../redux/actions';
import { getSelectedCell } from '../redux/selectors'
import { NO_CELL_SELECTED, EMPTY_CELL_VALUE } from '../constants';
import { getColumnIndex, getRowIndex } from '../util/coordinates';

// keyCodes:
// 27: esc
// 48-57 = 0-9:
// 37: left
// 38: up
// 39: right
// 40: down

const getNewCellCoordinates = (selectedCell:number[],keyCode:number) => {
  let dx = 0;
  let dy = 0;
  switch(keyCode){
    case 37: 
      dx = -1
      break;
    case 38: 
      dy = -1
      break;
    case 39: 
      dx = 1
      break;
    case 40: 
      dy = 1
      break;
  }
  return [getRowIndex(selectedCell)+dy,getColumnIndex(selectedCell)+dx]
}

// we pass in the store here as a way to get at the getState
// using selectors doesn't work because this is only mounted once so 
// it never re-fetches
const KeyboardController:React.FC<{store:any}> = ({children,store}) => {
  const handler:(e:any) => void = (e) => {
    const selectedCell = getSelectedCell(store.getState());
    const { keyCode } = e; 
// console.log(keyCode)
    if(keyCode >=49 && keyCode <= 57){
      // set the cell value
      const value = String(keyCode-48); // keycode for 1 is 49
      store.dispatch( setCellValue(selectedCell,value) )
    } else if (keyCode >=37 && keyCode <=40){
      // move the selected cell
      const newlySelected = getNewCellCoordinates(selectedCell,keyCode)
      store.dispatch( setSelectedCell(newlySelected) )
    } else if (keyCode===27){
      // escape
      store.dispatch( setSelectedCell(NO_CELL_SELECTED) )
    } else if (keyCode===8){
      // delete
      store.dispatch( setCellValue(selectedCell,EMPTY_CELL_VALUE) )
    }
  }
  useEventListener('keydown', handler);
  return <React.Fragment>{children}</React.Fragment>
}

export default KeyboardController;