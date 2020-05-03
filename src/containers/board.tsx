import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPuzzle, boardIsLoading } from '../redux/selectors'
import { loadPuzzle, loadSuccessful } from '../redux/actions'
import { boardIsLoaded } from '../util/parseBoard';
import Loader from '../components/loader'
const DisplayComponent = React.lazy(() => import('../components/board'));

const BoardContainer: React.FC  = () => {
  const dispatch = useDispatch()
  const board: any = useSelector(getPuzzle)
  const loaded: boolean = boardIsLoaded(board); 
  const isLoading: boolean = useSelector(boardIsLoading)

  useEffect( () => {
    let subscribed = true;
    if(subscribed && loaded){
      dispatch( loadSuccessful() )      
    }
    return () => {
      subscribed = false;
    }
  },[loaded, dispatch])

  useEffect( () => {
    let subscribed = true;
    if(subscribed && !loaded){
      dispatch( loadPuzzle() )
    }
    return () => {
      subscribed = false;
    }
  },[loaded, dispatch])

  if( isLoading ){
    return <Loader />
  }
  // console.log(board)
  return (<Suspense fallback={<div>...</div>}><DisplayComponent board={board} /></Suspense>)
}


export default BoardContainer; 