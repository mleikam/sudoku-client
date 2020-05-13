import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCellFlags, getCellNotes } from '../redux/selectors'
import { setSelectedCell } from '../redux/actions'
import { Cell, CellWrapper, Notes } from  '../components/board/cell';
import { getClassNames, getGridClassName } from './cellHelpers'

interface CellContainerProps {
  value: string,
  row: number,
  col: number
}

const shouldShowNotes = (value:string,notes?:boolean[]) => (value==="." && Array.isArray(notes));

const getDisplayComponent = (showNotes:boolean) => showNotes ? Notes : Cell; 

const CellContainer:React.FC<CellContainerProps> = ({value,row,col}) => {
  const dispatch = useDispatch()
  const flags = useSelector(getCellFlags)([row,col]);
  const onClick = () => dispatch(setSelectedCell([row,col]));
  const className = getClassNames(row,col,value,flags);
  const gridClassName = getGridClassName(row,col)
  const notes = useSelector(getCellNotes)([row,col]);
  const showNotes = shouldShowNotes(value,notes)
  const Display = getDisplayComponent(showNotes)
  return (
    <CellWrapper className={gridClassName} onClick={onClick}>
      <Display className={className} notes={notes} value={value} />
    </CellWrapper>
  );
}

export default CellContainer; 