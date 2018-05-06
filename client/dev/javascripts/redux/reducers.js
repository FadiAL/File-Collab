import fileReducer from './fileReducer.js';
import listReducer from './listReducer.js';
import statusReducer from './statusReducer.js';

const initialState = {
  status: {
    fileOpen: false,
    loading: true,
    creatingFile: false,
  },
  file: {
    name: "",
    contents: ""
  },
  list: {
    recents: [],
    files: []
  }
}
function setupReducer(socket){
  return fileApp;
}

function fileApp (state = initialState, action) {
  return{
    file: fileReducer(state.file, action),
    status: statusReducer(state.status, action),
    list: listReducer(state.list, action)
  }
}

export default fileApp;
