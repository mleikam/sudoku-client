/* eslint-disable no-console */
const logger = (state:any) => (next:any) => (action:any) => {
  console.group(action.type);
  console.log('action:', action);
  const returnValue = next(action);
  console.log('new state:', state.getState());
  console.groupEnd();
  return returnValue;
};

export default logger;
