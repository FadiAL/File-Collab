import {
  REQUEST_FILE,
  REQUEST_FILES,
  RECIEVE_FILE,
  RECIEVE_FILES,
  RECIEVE_RECENTS,
  RECIEVE_CREATED_FILE,
  TOGGLE_CREATING_FILE,
  UPDATE_FILE,
  DELETE_REQUEST,
  CREATE_REQUEST,
  ACTIVE_FILE_DELETED,
  FILE_DELETED
} from './actions.js'

const initialState = {
  fileOpen: false,
  loading: true,
  creatingFile: false,
  file: {
    name: "",
    contents: ""
  },
  recents: [],
  files: []
}
function setupReducer(socket){
  return fileApp;
}
function fileApp (state = initialState, action) {
  switch (action.type) {
    case REQUEST_FILE:
      return Object.assign({}, state, {
        loading: true,
        fileOpen: true
      })
    case REQUEST_FILES:
      return Object.assign({}, state, {
        loading: true,
        fileOpen: false,
        file: {
          name: "",
          contents: ""
        }
      })
    case RECIEVE_FILE:
      return Object.assign({}, state, {
        file: {
          name: action.fileName,
          contents: action.fileContents,
          loading: false,
        }
      })
    case RECIEVE_CREATED_FILE:
      var nRecents = state.recents.slice(0, -1);
      nRecents.push(action.file);
      return Object.assign({}, state, {
        nRecents,
        files: [
          ...state.files,
          action.file
        ]
      })
    case RECIEVE_FILES:
      return Object.assign({}, state, {
        files: action.files,
        loading: false
      })
    case RECIEVE_RECENTS:
      return Object.assign({}, state, {
        recents: action.recents
      })
    case TOGGLE_CREATING_FILE:
      return Object.assign({}, state, {
        creatingFile: !state.creatingFile
      })
    case UPDATE_FILE:
      return Object.assign({}, state, {
        file: {
          name: state.file.name,
          contents: action.file
        }
      })
    case DELETE_REQUEST:
      return Object.assign({}, state);
    case CREATE_REQUEST:
      return Object.assign({}, state, {
        creatingFile: false
      })
    case ACTIVE_FILE_DELETED:
      return Object.assign({}, state, {
        fileOpen: false,
        file: {
          fileName: "",
          fileContents: ""
        }
      })
    case FILE_DELETED:
      var nRecents = state.recents.splice();
      var nFiles = state.files.splice();
      return Object.assign({}, state, {
        recents: nRecents,
        files: nFiles
      })
  }
  return state;
}

export default fileApp;
