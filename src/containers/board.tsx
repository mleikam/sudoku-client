import React, { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardIsLoading, puzzleIsComplete, getDifficulty } from '../redux/selectors';
import { loadPuzzle, loadSuccessful } from '../redux/actions';
import Loader from '../components/loader';
import Completed from '../components/complete';

const BoardComponent = React.lazy(() => import('../components/board'));

const BoardContainer: React.FC = () => {
  const dispatch = useDispatch();
  const difficulty = useSelector(getDifficulty);
  const loaded: boolean = difficulty !== undefined;
  const isLoading: boolean = useSelector(boardIsLoading);
  const isComplete: boolean = useSelector(puzzleIsComplete);

  useEffect(() => {
    let subscribed = true;
    if (subscribed && loaded) {
      dispatch(loadSuccessful());
    }
    return () => {
      subscribed = false;
    };
  }, [loaded, dispatch]);

  useEffect(() => {
    let subscribed = true;
    if (subscribed && !loaded) {
      dispatch(loadPuzzle());
    }
    return () => {
      subscribed = false;
    };
  }, [loaded, dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Suspense fallback={<div>...</div>}>
      <>
        {isComplete && <Completed />}
        <BoardComponent />
      </>
    </Suspense>
  );
};


export default BoardContainer;
