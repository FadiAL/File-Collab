import {
  RECIEVE_FILES,
  ADD_FILE,
  RECIEVE_RECENTS,
  ACTIVE_FILE_DELETED,
  FILE_DELETED
} from './actions.js';

function listReducer(list, action) {
  switch(action.type) {
    case RECIEVE_FILES:
      return Object.assign({}, list, {
        files: action.files
      });
    case ADD_FILE:
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
    case FILE_DELETED:
      var nRecents = removeFromArray(list.recents, action.fileName);
      var nFiles = removeFromArray(list.files, action.fileName);
      return Object.assign({}, list, {
        recents: nRecents,
        files: nFiles
      });
    default:
      return list;
  }
}
function removeFromArray(arr, name) {
  var nArray = arr.reduce((acc, cur) => {
    if(cur != name)
      acc.push(cur);
    return acc;
  }, []);
  return nArray;
}
export default listReducer;
