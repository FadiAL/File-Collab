import {
  REQUEST_FILE,
  REQUEST_FILES,
  RECIEVE_FILE,
  RECIEVE_FILES,
  TOGGLE_CREATING_FILE,
  ACTIVE_FILE_DELETED,
  CREATE_REQUEST,
  DIALOG_ERROR
} from './actions.js';

function statusReducer(status, action) {
  switch(action.type) {
    case REQUEST_FILE:
      return Object.assign({}, status, {
        loading: true,
        fileOpen: true
      });
    case REQUEST_FILES:
      return Object.assign({}, status, {
        loading: true,
        fileOpen: false
      });
    case RECIEVE_FILE:
    case RECIEVE_FILES:
      return Object.assign({}, status, {
        loading: false
      });
    case TOGGLE_CREATING_FILE:
      return Object.assign({}, status, {
        creatingFile: !status.creatingFile
      });
    case ACTIVE_FILE_DELETED:
      return Object.assign({}, status, {
        fileOpen: false
      });
    case CREATE_REQUEST:
      return Object.assign({}, status, {
        creatingFile: false
      });
    case DIALOG_ERROR:
      return Object.assign({}, status, {
        creatingFile: true,
        fileOpen: false,
        loading: false
      })
    default:
      return status;
  }
}
export default statusReducer;
