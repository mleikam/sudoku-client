import React, { ReactElement, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCellNotes, getUserValueAtCell } from '../redux/selectors';
import { setSelectedCell } from '../redux/actions';
import { Cell, CellWrapper, Notes } from '../components/cell';
import {
  getClassNames, getGridClassName, shouldShowNotes, useFlags,
} from './cellHelpers';

interface CellContainerProps {
  row: number,
  col: number
}
interface CellWrapperProps {
  children: ReactElement,
  gridClassName: string,
  onClick: () => void
}

const CellContent:React.FC<CellContainerProps> = ({ row, col }) => {
  const coords = [row, col];
  const value = useSelector((store:any) => getUserValueAtCell(store, coords));
  const notes = useSelector((store:any) => getCellNotes(store, coords));
  // const flags = ({})
  const flags = useFlags(coords);
  const className = getClassNames(row, col, value, flags);
  const showNotes = shouldShowNotes(value, notes);

  const CellDisplay = useCallback(() => <Cell className={className} value={value} />, [className, value]);
  const NotesDisplay = useCallback(() => <Notes className={className} notes={notes} />, [className, notes]);
  return showNotes ? <NotesDisplay /> : <CellDisplay />;
};

const CellContainer:React.FC<CellContainerProps> = ({ row, col }) => {
  const coords = [row, col];
  const dispatch = useDispatch();
  const onClick = () => dispatch(setSelectedCell(coords));
  const gridClassName = getGridClassName(row, col);
  return (
    <CellWrapper className={gridClassName} onClick={onClick}>
      <CellContent row={row} col={col} />
    </CellWrapper>
  );
};

export default CellContainer;
