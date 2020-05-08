import { MODE } from '../constants';
import { Action } from '../types/action';

export const getActionMetaMode = (action:Action) => {
  const {meta} = action;
  if(meta===undefined){
    return undefined;
  }
  const { mode } = meta; 
  return mode; 
}

export const modeIsNotation = (action:Action) => {
  const mode = getActionMetaMode(action)
  return mode===MODE.NOTE
}

export const modeIsNormal = (action:Action) => {
  const mode = getActionMetaMode(action)
  return mode===MODE.ENTER  
}

export const modeIsLoading = (action:Action) => {
  const mode = getActionMetaMode(action)
  return mode===MODE.LOAD  
}
