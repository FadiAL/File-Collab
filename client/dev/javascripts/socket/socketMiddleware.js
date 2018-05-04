import {
  REQUEST_FILE,
  REQUEST_FILES,
  RECIEVE_FILE,
  RECIEVE_FILES,
  RECIEVE_RECENTS,
  RECIEVE_CREATED_FILE,
  TOGGLE_CREATING_FILE,
  UPDATE_FILE,
  DELETE_REQUEST
} from '../redux/actions.js';

const socketMiddlewareCreator = function(socket) {
  return store => next => action => {
    switch (action.type) {
      case REQUEST_FILE:
        socket.emit('fileReq', action.file);
        next(action);
        return;
      case REQUEST_FILES:
        socket.emit('files');
        next(action);
        return;
      case UPDATE_FILE:
        socket.emit('keystroke', action.file);
        next(action);
        return;
      case DELETE_REQUEST:
        socket.emit('delete', action.fileName);
        next(action);
        return;
      default:
        next(action);
    }
  }
}

export default socketMiddlewareCreator;
