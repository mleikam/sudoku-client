import React from 'react';
import {BoardInterface} from '../../types/boardState'
import { StyledCell, StyledRow, StyledGrid } from './styled';
import { useSelector, useDispatch } from 'react-redux'

import { getSelectedCell } from '../../redux/selectors'
import { setSelectedCell } from '../../redux/actions';
import { getCellClassName } from './helpers';
import { EMPTY_CELL_VALUE } from '../../constants';

interface Props {
  board: BoardInterface,
}

interface RowProps {
  data:string[],
  row:number,
  selectedCell: number[],
}

interface GridProps {
  data: Array<string[]>,
}

interface CellProps {
  value:string,
  onClick:()=>void,
  className: string,
}

const Difficulty:React.FC<{value:number}> = ({value}) => (<div>Difficulty: {value}</div>)

const displayValue = (value:string) => value=== EMPTY_CELL_VALUE ? <span>&nbsp;</span> : value; 

const Cell:React.FC<CellProps> = ({value,onClick,className}) => (
  <StyledCell className={className} onClick={onClick}>{displayValue(value)}</StyledCell>
)

const Row:React.FC<RowProps> = ({data, row,selectedCell}) => {
  const dispatch = useDispatch()
  const mapFunction = (value:string,index:number) => {
    const selected = (row === selectedCell[0] && index === selectedCell[1])
    return (<Cell 
      key={`row-${row}-cell-${index}`} 
      value={value} 
      onClick={() => dispatch( setSelectedCell([row,index]) )}
      className={getCellClassName(row,index,selected)}
    />)
  }
  return (<StyledRow>{data.map(mapFunction)}</StyledRow>);
}

const Grid:React.FC<GridProps> = ({data}) => {
  const selectedCell = useSelector(getSelectedCell)
  if(data===undefined){
    return null ;
  }
  const mapFunction = (rowData:string[],index:number) => (<Row 
    data={rowData} 
    key={`row-${index}`} 
    row={index} 
    selectedCell={selectedCell}
  />);

  return (<StyledGrid>{data.map(mapFunction)}</StyledGrid>)
}

export const Board:React.FC<Props> = ({board}) => {
// console.log('board component',board)
  const { difficulty, user } = board; 
  if(!difficulty || !user){
    return null; 
  }
  return (<div>
    <Grid data={user} />
    <Difficulty value={difficulty} />
    </div>)
}

export default Board;
