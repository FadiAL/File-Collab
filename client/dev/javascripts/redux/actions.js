//action types
export const REQUEST_FILES = "REQUEST_FILES";
export const REQUEST_FILE = "REQUEST_FILE";
export const RECIEVE_FILE = "RECIEVE_FILE";
export const RECIEVE_FILES = "RECIEVE_FILES";
export const RECIEVE_RECENTS = "UPDATE_RECENTS";
export const LEAVE_FILE = "LEAVE_FILE";

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
function recieveFile(file) {
  return {
    type: RECIEVE_FILE,
    file
  }
};
function recieveRecents(recents) {
  return {
    type: RECIEVE_RECENTS,
    recents
  }
};
function leaveFile() {
  return {
    type: LEAVE_FILE
  }
};
