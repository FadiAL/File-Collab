import {
  recieveFiles,
  recieveFile,
  recieveRecents
} from '../redux/actions.js';

export function setupSocket(socket, store) {

  socket.on('files', files => {
    store.dispatch(recieveFiles(files));
  });
  socket.on('fileReq', (fileName, fileContents) => {
    store.dispatch(recieveFile(fileName, fileContents));
  });
  socket.on('recentFiles', recents => {
    store.dispatch(recieveRecents(recents));
  });
}
