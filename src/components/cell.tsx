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

export const Notes: React.FC<NotesProps> = ({ notes, className }) => (
  <StyledNotes className={`notes ${className}`}>
    {notes.map((exists:boolean, index:number) => (exists ? <span key={index}>{index + 1}</span> : <span key={index}>&nbsp;</span>))}
  </StyledNotes>
);

export const Cell:React.FC<CellProps> = ({ value, className }) => (
  <StyledCell className={className}>{displayValue(value)}</StyledCell>
);
