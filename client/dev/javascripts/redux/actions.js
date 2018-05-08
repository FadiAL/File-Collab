//action types
export const REQUEST_FILES = "REQUEST_FILES";
export const REQUEST_FILE = "REQUEST_FILE";
export const RECIEVE_FILE = "RECIEVE_FILE";
export const RECIEVE_FILES = "RECIEVE_FILES";
export const RECIEVE_RECENTS = "UPDATE_RECENTS";
export const RECIEVE_CREATED_FILE = "RECIEVE_CREATED_FILE";
export const TOGGLE_CREATING_FILE = "TOGGLE_CREATING_FILE";
export const UPDATE_FILE = "UPDATE_FILE";
export const DELETE_REQUEST = "DELETE_REQUEST";
export const CREATE_REQUEST = "CREATE_REQUEST";
export const ACTIVE_FILE_DELETED = "ACTIVE_FILE_DELETED";
export const FILE_DELETED = "FILE_DELETED";
export const DIALOG_FILENAME_UPDATE = "DIALOG_FILENAME_UPDATE";
export const DIALOG_ERROR = "DIALOG_ERROR";
//action creators

export function requestFiles() {
  return {
    type: REQUEST_FILES
  }
};
export function requestFile(file) {
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
export function recieveFile(name, content) {
  return {
    type: RECIEVE_FILE,
    fileName: name,
    fileContents: content
  }
};
export function recieveRecents(recents) {
  return {
    type: RECIEVE_RECENTS,
    recents
  }
};
export function recieveCreatedFile(file) {
  return {
    type: RECIEVE_CREATED_FILE,
    file
  }
};
export function toggleCreatingFile() {
  return {
    type: TOGGLE_CREATING_FILE
  }
};
export function updateFile(file) {
  return {
    type: UPDATE_FILE,
    file
  }
};
export function deleteRequest(fileName) {
  return {
    type: DELETE_REQUEST,
    fileName
  }
};
export function createRequest(fileName) {
  return {
    type: CREATE_REQUEST,
    fileName
  }
}
export function activeFileDeleted() {
  return {
    type: ACTIVE_FILE_DELETED
  }
};
export function fileDeleted(fileName) {
  return {
    type: FILE_DELETED
  }
};
export function updateDialogFilename(fileName) {
  return {
    type: DIALOG_FILENAME_UPDATE,
    fileName
  }
};
export function dialogError(error) {
  return {
    type: DIALOG_ERROR,
    error
  }
}
