import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNotationMode } from '../redux/selectors'
import { setMode } from '../redux/actions';
import { MODE } from '../constants';


import ControlsDisplay from '../components/controls';

const ControlsContainer = () => {
  const dispatch = useDispatch();
  const isNotation = useSelector( isNotationMode )
  const onModeToggle = () => {
    if(isNotation){ dispatch(setMode(MODE.ENTER)) } else { dispatch(setMode(MODE.NOTE)) }
  } 

  return <ControlsDisplay isNotation={isNotation} onModeToggle={onModeToggle} />
}

export default ControlsContainer; 