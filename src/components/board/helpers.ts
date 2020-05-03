
export const getCellClassName = (row:number,col:number,selected:boolean) => {
  const names = []
  if(selected){
    names.push('selected')
  }
  if(row % 3 === 0){
    names.push('topBorder')
  }
  if(row % 3 === 2){
    names.push('bottomBorder')
  }
  if(col % 3 === 0){
    names.push('leftBorder')
  }
  if(col % 3 === 2){
    names.push('rightBorder')
  }
  return names.join(' ')
}