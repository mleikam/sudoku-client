import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPuzzle, boardIsLoading, isNotationMode, puzzleIsComplete } from '../redux/selectors'
import { loadPuzzle, loadSuccessful } from '../redux/actions'
import { boardIsLoaded } from '../util/parseBoard';
import Loader from '../components/loader';
import Completed from '../components/complete'

const DisplayComponent = React.lazy(() => import('../components/board'));

const BoardContainer: React.FC  = () => {
  const dispatch = useDispatch();
  const board: any = useSelector(getPuzzle)
  const loaded: boolean = boardIsLoaded(board); 
  const isLoading: boolean = useSelector(boardIsLoading);
  const notesAreActive: boolean = useSelector(isNotationMode);
  const isComplete: boolean = useSelector(puzzleIsComplete);

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
  return (
    <Suspense fallback={<div>...</div>}>
      <React.Fragment>
      {isComplete && <Completed />}
      <DisplayComponent board={board} notesAreActive={notesAreActive}/>
      </React.Fragment>
    </Suspense>
  );
}


export default BoardContainer; 