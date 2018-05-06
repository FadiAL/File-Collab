import {
  RECIEVE_FILE,
  UPDATE_FILE,
  ACTIVE_FILE_DELETED,
  REQUEST_FILES
} from './actions.js';

function fileReducer(file, action) {
  switch(action.type) {
    case RECIEVE_FILE:
      return Object.assign({}, file, {
        name: action.fileName,
        contents: action.fileContents
      });
    case UPDATE_FILE:
      return Object.assign({}, file, {
        name: file.name,
        contents: action.file
      });
    case ACTIVE_FILE_DELETED:
      return Object.assign({}, file, {
        name: "",
        contents: ""
      });
    case REQUEST_FILES:
      return Object.assign({}, file, {
        name: "",
        contents: ""
      });
    default:
      return file;
  }
}
export default fileReducer;
