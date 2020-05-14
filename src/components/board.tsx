import React from 'react';
import { BoardInterface } from '../types/boardState';
import { StyledRow, StyledGrid } from './styled';
import CellContainer from '../containers/cell';
import { DIMENSION } from '../constants';

interface Props {
  board: BoardInterface,
  notesAreActive: boolean,
}

interface RowProps {
  row:number,
}

const Row:React.FC<RowProps> = ({ row }) => {
  const mapFunction = (_:string, index:number) => (
    <CellContainer
      key={`cell-${row}-${index}`}
      row={row}
      col={index}
    />
  );
  const data = Array(DIMENSION).fill('');
  return (<StyledRow>{data.map(mapFunction)}</StyledRow>);
};

const Grid:React.FC = () => {
  const data = Array(DIMENSION).fill('');
  const mapFunction = (_:string[], index:number) => (
    <Row
      key={`row-${index}`}
      row={index}
    />
  );
  return (<StyledGrid>{data.map(mapFunction)}</StyledGrid>);
};

export default Grid;
