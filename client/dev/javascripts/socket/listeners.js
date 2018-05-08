import {
  recieveFiles,
  recieveFile,
  recieveRecents,
  updateFile,
  addFile,
  requestFile,
  activeFileDeleted,
  fileDeleted,
  dialogError
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
  socket.on('currentFileCreated', fileName => {
    store.dispatch(addFile(fileName));
    store.dispatch(requestFile(fileName));
  });
  socket.on('fileCreate', fileName => {
    store.dispatch(addFile(fileName));
  });
  socket.on('deletedOpen', () => {
    store.dispatch(fileDeleted(store.getState().file.name));
    store.dispatch(activeFileDeleted());
  });
  socket.on('fileDeleted', key => {
    store.dispatch(fileDeleted(key));
  });
  socket.on('fileTaken', fileName => {
    store.dispatch(dialogError(fileName));
  })
}
