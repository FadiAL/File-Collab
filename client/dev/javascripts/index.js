import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import fileApp from './redux/reducers.js';
import {setupSocket} from './redux/listeners.js';
import App from './components/App.jsx';

const store = createStore(fileApp);
const socket = setupSocket(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
