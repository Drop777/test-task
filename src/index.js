/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './Components/App/App';
import { store } from './store/index';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <HashRouter basename="/users">
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
