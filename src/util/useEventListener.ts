import { useEffect, useRef } from 'react';

const getRef = (ref:any) => ref.current;

const useEventListener = (eventName:string, handler:any, element = window) => {
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element !== undefined && typeof element.addEventListener === 'function';
    const fn = getRef(savedHandler);
    const eventListener = (event:any) => fn(event);
    if (isSupported) {
      element.addEventListener(eventName, eventListener);
    }
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
