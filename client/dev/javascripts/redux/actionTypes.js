//action types
export const SET_FILE_NAME = "SET_FILE_NAME";
export const SET_FILE_CONTENTS = "SET_FILE_CONTENTS";
export const UPDATE_RECENTS = "UPDATE_RECENTS";
export const UPDATE_FILES = "UPDATE_FILES";
export const SET_FILE_OPEN = "SET_FILE_OPEN";

//action creators
export function changeFileName (newName){
  return {type: SET_FILE_NAME, newName}
}
export function changeFileContents (newContents) {
  return {type: SET_FILE_CONTENTS, newContents}
}
export function updateRecents (newList) {
  return {type: UPDATE_RECENTS, newList}
}
export function updateFiles (newFiles) {
  return {type: UPDATE_FILES, newFiles}
}
export function toggleFileOpen () {
  return {type: SET_FILE_OPEN}
}
