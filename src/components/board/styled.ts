import styled from 'styled-components'
import { DIMENSIONS } from '../../constants';

const cellSize = 40;
const borderSize = 1;
const minorGridColor = "#ccc"
const majorGridColor = '#666'
export const StyledGrid = styled.div` 
  border: 2px solid black; 
  width: ${(cellSize+borderSize*2)*(DIMENSIONS.WIDTH)}px;
`;

export const StyledRow = styled.div`
`;

export const StyledCell = styled.div`
  width: ${cellSize}px; 
  height: ${cellSize}px;
  display: inline-block; 
  border: ${borderSize}px solid ${minorGridColor}; 
  text-align: center;
  line-height: ${cellSize}px;
  font-size: ${cellSize*.8}px;
  font-family: Arial,sans-serif; 
  &.selected {
    background-color: yellow; 
  }
  &.topBorder {
    border-top-color: ${majorGridColor};
  }
  &.bottomBorder {
    border-bottom-color: ${majorGridColor};
  }
  &.leftBorder {
    border-left-color: ${majorGridColor};
  }
  &.rightBorder {
    border-right-color: ${majorGridColor};
  }
`;
