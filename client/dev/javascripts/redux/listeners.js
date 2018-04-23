import io from 'socket.io-client';
import {
  recieveFiles,
  recieveFile,
  recieveRecents
} from './actions.js';

export function setupSocket(store) {
  const socket = io();

  socket.on('files', files => {
    store.dispatch(recieveFiles(files));
  });
  socket.on('fileReq', (fileName, fileContents) => {
    store.dispatch(recieveFile(fileName, fileContents));
  });
  socket.on('recentFiles', recents => {
    store.dispatch(recieveRecents(recents));
  });

  return socket;
}
