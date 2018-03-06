import {
  SET_FILE_NAME,
  SET_FILE_OPEN,
  SET_FILE_CONTENTS,
  UPDATE_RECENTS,
  UPDATE_FILES
} from './actions.js'

const initialState = {
  file: {
    fileName: null,
    fileContents: null,
    fileOpen: false
  }
  recents: [],
  files: []
}

function fileApp (state = initialState, action) {
  switch (action.type) {
    case SET_FILE_NAME:
      Object.assign({}, state, Object.assign({}, state.file, {
        fileName: action.newName;
      }));
      break;
    case SET_FILE_CONTENTS:
      Object.assign({}, state, Object.assign({}, state.file, {
        fileContents: action.newContents;
      }));
      break;
    case SET_FILE_OPEN:
      Object.assign({}, state, Object.assign({}, state.file, {
        fileOpen: !state.file.fileOpen;
      }));
      break;
    case UPDATE_RECENTS:
      Object.assign({}, state, {
        recents: action.newList;
      });
      break;
    case UPDATE_FILES:
      Object.assign({}, state, {
        files: action.newFiles;
      });
      break;
  }
  return state;
}
