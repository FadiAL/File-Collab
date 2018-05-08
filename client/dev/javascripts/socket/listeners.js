import {
  recieveFiles,
  recieveFile,
  recieveRecents,
  updateFile
} from '../redux/actions.js';

export function setupSocket(socket, store) {

  socket.on('files', files => {
    store.dispatch(recieveFiles(files));
  });
  socket.on('fileReq', (fileObj) => {
    store.dispatch(recieveFile(fileObj.fileName, fileObj.fileContents));
  });
  socket.on('recentFiles', recents => {
    store.dispatch(recieveRecents(recents));
  });
  socket.on('keystroke', file => {
    store.dispatch(updateFile(file));
  });
}
