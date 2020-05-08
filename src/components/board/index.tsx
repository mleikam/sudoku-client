import React from 'react';
import {BoardInterface} from '../../types/boardState'
import { StyledRow, StyledGrid } from './styled';
import CellContainer from '../../containers/cell';

interface Props {
  board: BoardInterface,
  notesAreActive: boolean,
}

interface RowProps {
  data:string[],
  row:number,
}

interface GridProps {
  data: Array<string[]>,
  notesAreActive: boolean
}

const Difficulty:React.FC<{value:number}> = ({value}) => (<div>Difficulty: {value}</div>)

const Row:React.FC<RowProps> = ({data, row}) => {
  const mapFunction = (value:string,index:number) => {
    return (<CellContainer
      key={`row-${row}-cell-${index}`}
      value={value}
      row={row}
      col={index}
    />)
  }
  return (<StyledRow>{data.map(mapFunction)}</StyledRow>);
}

const Grid:React.FC<GridProps> = ({data,notesAreActive}) => {
  if(data===undefined){
    return null ;
  }
  const mapFunction = (rowData:string[],index:number) => {
    return (<Row 
      data={rowData} 
      key={`row-${index}`} 
      row={index} 
    />);
  }
  const className = notesAreActive ? 'withNotes' : 'noNotes';
  return (<StyledGrid className={className}>{data.map(mapFunction)}</StyledGrid>)
}

export const Board:React.FC<Props> = ({board, notesAreActive}) => {
  const { difficulty, user } = board; 
  if(!difficulty || !user){
    return null; 
  }
  return (<div>
    <Grid data={user} notesAreActive={notesAreActive} />
    <Difficulty value={difficulty} />
    </div>)
}

export default Board;
