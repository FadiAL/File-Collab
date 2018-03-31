import {
  REQUEST_FILE,
  REQUEST_FILES,
  RECIEVE_FILE,
  RECIEVE_FILES,
  RECIEVE_RECENTS,
  RECIEVE_CREATED_FILE
} from './actions.js'

const initialState = {
  fileOpen: false,
  loading: true,
  recents: [],
  files: []
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
        fileOpen: false
      })
    case RECIEVE_FILE:
      return Object.assign({}, state, {
        file: {
          action.fileName,
          action.fileContents
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
        files: action.files
      })
    case RECIEVE_RECENTS:
      return Object.assign({}, state, {
        recents: action.recents
      })
  }
  return state;
}

export default fileApp;
