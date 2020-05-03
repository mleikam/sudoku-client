import { createStore, compose, applyMiddleware } from 'redux'
import reducers from '../reducers'
import middleware from '../middleware'
import { initialState } from './initialState'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)
export default store;
