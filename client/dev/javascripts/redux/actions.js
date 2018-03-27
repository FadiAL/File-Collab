//action types
export const REQUEST_FILES = "REQUEST_FILES";
export const REQUEST_FILE = "REQUEST_FILE";
export const RECIEVE_FILE = "RECIEVE_FILE";
export const RECIEVE_FILES = "RECIEVE_FILES";
export const RECIEVE_RECENTS = "UPDATE_RECENTS";

//action creators

function requestFiles() {
  return {
    type: REQUEST_FILES
  }
};
function requestFile(file) {
  return {
    type: REQUEST_FILE,
    file
  }
};
function recieveFiles(files) {
  return {
    type: RECIEVE_FILES,
    files
  }
};
function recieveFile(data) {
  return {
    type: RECIEVE_FILE,
    fileName: data.fileName,
    fileContents: data.fileContents
  }
};
function recieveRecents(recents) {
  return {
    type: RECIEVE_RECENTS,
    recents
  }
};
