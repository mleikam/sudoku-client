
export const getColumnIndex = (coords:number[]) => coords[1]

export const getRowIndex = (coords:number[]) => coords[0]

export const coordinatesMatch = (coords1:number[],coords2:number[]) => {
  return coords1[0] === coords2[0] && coords1[1] === coords2[1]
}

export const rowAndColumnMatchCoordinates = (row:number,column:number,coords:number[]) => {
  return coordinatesMatch([row,column],coords);
}

const slugDelimiter = '-'

export const getCoordinateSlug = (coords:number[]) => coords.join(slugDelimiter)

export const coordinateSlugToIndices = (slug:string) => {
  const values = slug.split(slugDelimiter);
  return values.map( (n:string) => parseInt(n,10) );
}