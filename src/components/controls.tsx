import React from 'react';

interface Props {
  isNotation:boolean,
  onModeToggle: () => void,
}

const getModeLabel = (isNotation:boolean) => isNotation ? "Exit Notes" : "Use Notes"

const Controls:React.FC<Props> = ({isNotation, onModeToggle}) => (<div>
  <button onClick={onModeToggle}>{getModeLabel(isNotation)}</button>
</div>)

export default Controls; 