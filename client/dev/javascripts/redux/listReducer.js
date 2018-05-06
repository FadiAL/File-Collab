import {
  RECIEVE_FILES,
  RECIEVE_CREATED_FILE,
  RECIEVE_RECENTS
} from './actions.js';

function listReducer(list, action) {
  switch(action.type) {
    case RECIEVE_FILES:
      return Object.assign({}, list, {
        files: action.files
      });
    case RECIEVE_CREATED_FILE:
    var nRecents = list.recents.slice(0, -1);
    nRecents.push(action.file);
      return Object.assign({}, list, {
        recents: nRecents,
        files: [
          ...list.files,
          action.file
        ]
      });
    case RECIEVE_RECENTS:
      return Object.assign({}, list, {
        recents: action.recents
      });
    default:
      return list;
  }
}
export default listReducer;
