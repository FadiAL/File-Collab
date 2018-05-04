import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import fileApp from './redux/reducers.js';
import {setupSocket} from './socket/listeners.js';
import App from './components/App.jsx';
import socketMiddlewareCreator from './socket/socketMiddleware.js';
import io from 'socket.io-client';

const socket = io();

const sMiddleware = socketMiddlewareCreator(socket);

const store = createStore(fileApp, applyMiddleware(sMiddleware));

setupSocket(socket, store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
