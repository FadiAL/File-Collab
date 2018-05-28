import {
  DIALOG_FILENAME_UPDATE,
  DIALOG_ERROR,
  TOGGLE_CREATING_FILE
} from './actions.js'

function dialogReducer(creatingDialog, action) {
  switch(action.type) {
    case DIALOG_FILENAME_UPDATE:
      return Object.assign({}, creatingDialog, {
        curName: action.fileName
      });
    case DIALOG_ERROR:
      return Object.assign({}, creatingDialog, {
        error: action.error
      });
    case TOGGLE_CREATING_FILE:
      return Object.assign({}, creatingDialog, {
        curName: "",
        error: ""
      });
    default:
      return creatingDialog;
  }
}
export default dialogReducer;
