import React from 'react';
import { StyledCell, StyledNotes, StyledCellContainer } from './styled';
import { EMPTY_CELL_VALUE, CLEAR_CELL_VALUE } from '../constants';

interface CellProps {
  value:string,
  className: string,
}

interface NotesProps {
  className: string,
  notes: boolean[],
}

interface CellWrapperProps {
  onClick:()=>void,
  children: React.ReactElement,
  className: string
}

export const displayValue = (value:string) => ([EMPTY_CELL_VALUE, CLEAR_CELL_VALUE].includes(value) ? <span>&nbsp;</span> : value);

export const CellWrapper:React.FC<CellWrapperProps> = ({ onClick, className, children }) => (
  <StyledCellContainer onClick={onClick} className={className}>
    {children}
  </StyledCellContainer>
);

const notesMap = (exists:boolean, index:number) => {
  const blank = <span key={index}>&nbsp;</span>;
  const full = <span key={index}>{index + 1}</span>;
  return exists ? full : blank;
};

export const Notes: React.FC<NotesProps> = ({ notes, className }) => (
  <StyledNotes className={`notes ${className}`}>
    {notes.map(notesMap)}
  </StyledNotes>
);

export const Cell:React.FC<CellProps> = ({ value, className }) => (
  <StyledCell className={className}>{displayValue(value)}</StyledCell>
);
