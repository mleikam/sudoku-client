import { DIMENSIONS } from '../constants';
import { BoardConfig } from '../types/boardState'
import { getColumnIndex, getRowIndex } from './coordinates';

export const boardIsLoaded = (board:BoardConfig) => {
  if(board.difficulty===undefined) return false;
  return true;
}

const removeWhitespace = (s:string) => s.replace(/[\s]+/g,'')

const configIsValid = (cfg:Array<string>) => cfg.length === DIMENSIONS.HEIGHT * DIMENSIONS.WIDTH;

const dimensionalizeArray = (arr:string[],width:number,height:number) => {
  const parsed = []
  for(let i=0; i<height; i++){
    const start = i*width;
    const end = start + width;
    parsed.push( arr.slice(start,end) )
  }
  return parsed;
}

export const parseBoardConfig = (config:string|undefined):Array<any>|undefined => {
  if(!config) return undefined;
  const clean = removeWhitespace(config)
  const arrConfig = clean.split('');
  if( configIsValid(arrConfig)===false ) return undefined;
  return dimensionalizeArray(arrConfig,DIMENSIONS.WIDTH,DIMENSIONS.HEIGHT);
}

export const outOfBounds = (coords:number[]) => {
  const row = getRowIndex(coords);
  const col = getColumnIndex(coords);
  if(row < 0 || row >= DIMENSIONS.HEIGHT) return true;
  if(col < 0 || col >= DIMENSIONS.WIDTH) return true;
  return false;
}
