import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store'
import KeyboardController from './containers/keyboard'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <KeyboardController store={store}>
        <App />
      </KeyboardController>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
