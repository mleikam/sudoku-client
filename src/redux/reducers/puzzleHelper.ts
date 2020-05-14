import { getColumnIndex, getRowIndex } from '../../util/coordinates';

export const composeNewState = (state:any, selected:number[], payload:string) => {
  const newUserState = [...state.user];
  const row = getRowIndex(selected);
  const col = getColumnIndex(selected);
  newUserState[row][col] = payload;
  return {
    ...state,
    user: newUserState,
  };
};

export const userIsCorrect = (puzzle:any, coords:number[]) => {
  const row = getRowIndex(coords);
  const col = getColumnIndex(coords);
  return puzzle.solution[row][col] === puzzle.user[row][col];
};
