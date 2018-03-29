import io from 'socket.io-client';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {fileApp} from './redux/reducers.js';

const socket = io();
const store = createStore(fileApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
