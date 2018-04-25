import {
  REQUEST_FILE,
  REQUEST_FILES,
  RECIEVE_FILE,
  RECIEVE_FILES,
  RECIEVE_RECENTS,
  RECIEVE_CREATED_FILE,
  TOGGLE_CREATING_FILE
} from '../redux/actions.js';

const socketMiddlewareCreator = function(socket) {
  return store => next => action => {
    switch (action.type) {
      case REQUEST_FILE:
        socket.emit('fileReq', action.file);
        next(action);
      case REQUEST_FILES:
        socket.emit('files');
        next(action);
      default:
        next(action);
    }
  }
}

export default socketMiddlewareCreator;
