import React from 'react';

interface Props {
  isNotation:boolean,
  onModeToggle: () => void,
  difficulty: number,
}

const getModeLabel = (isNotation:boolean) => (isNotation ? 'Exit Notes' : 'Use Notes');

const Controls:React.FC<Props> = ({ isNotation, onModeToggle, difficulty }) => (
  <div>
    <Difficulty value={difficulty} />
    <button type="button" onClick={onModeToggle}>{getModeLabel(isNotation)}</button>
  </div>
);

export const Difficulty:React.FC<{value:number}> = ({ value }) => (
  <div>
    Difficulty:
    {value}
  </div>
);


export default Controls;
