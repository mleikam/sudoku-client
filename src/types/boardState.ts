
export interface BoardConfig {
  solution?: string,
  initial?: string,
  difficulty?: number
}


export interface BoardInterface {
  solution?: Array<string[]>,
  initial: Array<string[]>,
  user?: Array<string[]>,
  difficulty?: number
}