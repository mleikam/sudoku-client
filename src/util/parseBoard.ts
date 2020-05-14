import { DIMENSION } from '../constants';
import { BoardConfig } from '../types/boardState';
import { getColumnIndex, getRowIndex } from './coordinates';

export const boardIsLoaded = (board:BoardConfig) => {
  if (board.difficulty === undefined) return false;
  return true;
};

const removeWhitespace = (s:string) => s.replace(/[\s]+/g, '');

const configIsValid = (cfg:Array<string>) => cfg.length === DIMENSION * DIMENSION;

const dimensionalizeArray = (arr:string[], width:number, height:number) => {
  const parsed = [];
  for (let i = 0; i < height; i++) {
    const start = i * width;
    const end = start + width;
    parsed.push(arr.slice(start, end));
  }
  return parsed;
};

export const parseBoardConfig = (config:string|undefined):Array<any>|undefined => {
  if (!config) return undefined;
  const clean = removeWhitespace(config);
  const arrConfig = clean.split('');
  if (configIsValid(arrConfig) === false) return undefined;
  return dimensionalizeArray(arrConfig, DIMENSION, DIMENSION);
};

export const outOfBounds = (coords:number[]) => {
  const row = getRowIndex(coords);
  const col = getColumnIndex(coords);
  if (row < 0 || row >= DIMENSION) return true;
  if (col < 0 || col >= DIMENSION) return true;
  return false;
};

const getCageId = (row:number, col:number) => String(Math.floor(row / 3) * 3 + Math.floor(col / 3));

const getCageCenter = (id:number) => [Math.floor(id / 3) * 3 + 1, Math.floor(id % 3) * 3 + 1];

const getCageCoords = (id:string) => {
  const [y, x] = getCageCenter(parseInt(id, 10));
  const coords = [
    [y - 1, x - 1], [y - 1, x + 0], [y - 1, x + 1],
    [y + 0, x - 1], [y + 0, x + 0], [y + 0, x + 1],
    [y + 1, x - 1], [y + 1, x + 0], [y + 1, x + 1],
  ];
  return coords;
};

export const getSiblings = (selected:number[]) => {
  const row = getRowIndex(selected);
  const col = getColumnIndex(selected);
  // row
  const rowCoords = Array(DIMENSION).fill([row, undefined]).map((arr, index) => [arr[0], index]);
  // col
  const colCoords = Array(DIMENSION).fill([undefined, col]).map((arr, index) => [index, arr[1]]);
  // cage
  const cageCoods = getCageCoords(getCageId(row, col));
  return { row: rowCoords, column: colCoords, cage: cageCoods };
};
