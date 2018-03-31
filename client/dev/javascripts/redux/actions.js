//action types
export const REQUEST_FILES = "REQUEST_FILES";
export const REQUEST_FILE = "REQUEST_FILE";
export const RECIEVE_FILE = "RECIEVE_FILE";
export const RECIEVE_FILES = "RECIEVE_FILES";
export const RECIEVE_RECENTS = "UPDATE_RECENTS";
export const RECIEVE_CREATED_FILE = "RECIEVE_CREATED_FILE";
export const TOGGLE_CREATING_FILE = "TOGGLE_CREATING_FILE";
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
export function recieveFiles(files) {
  return {
    type: RECIEVE_FILES,
    files
  }
};
export function recieveFile(data) {
  return {
    type: RECIEVE_FILE,
    fileName: data.fileName,
    fileContents: data.fileContents
  }
};
export function recieveRecents(recents) {
  return {
    type: RECIEVE_RECENTS,
    recents
  }
};
function recieveCreatedFile(file) {
  return {
    type: RECIEVE_CREATED_FILE,
    file
  }
};
function toggleCreatingFile() {
  return {
    type: TOGGLE_CREATING_FILE
  }
};
