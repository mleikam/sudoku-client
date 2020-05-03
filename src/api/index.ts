
const url = process.env.REACT_APP_BACKEND_URL || "http://localhost"

export const getPuzzle = () => fetch(url).then( res => res.json() )
