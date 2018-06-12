const assert = require('chai').assert;

const reduxPath = '../client/dev/javascripts/redux';
import fileApp from '../client/dev/javascripts/redux/reducers.js';
import {
  recieveFiles,
  recieveFile,
  recieveRecents,
  addFile,
  toggleCreatingFile,
  updateFile,
  closeFile,
  fileDeleted,
  activeFileDeleted,
  updateDialogFilename,
  dialogError
  } from '../client/dev/javascripts/redux/actions.js';

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
  },
  creatingDialog: {
    curName: "",
    error: ""
  }
};
const fileArr = ['file1', 'file2', 'file3'];
const file = {name: 'testFile', contents: 'testContents'};
const recents = ['r1', 'r2', 'r3'];
const file2 = 'testFile2';
const updatedText = 'testFile2Updated';
const toDelete = 'file2';
const updatedDialogFilename = 'udf';
const dialogTestError = 'testError';

describe('Redux', function() {
  describe('#reducers', function() {
    it('should return initial state', function() {
      assert.deepEqual(fileApp(undefined, {}), initialState);
    });
    it('should update state to contain new files', function() {
      assert.deepEqual(fileApp(initialState, recieveFiles(fileArr)).list.files, fileArr);
    });
    it('should update file data', function() {
      assert.deepEqual(fileApp(initialState, recieveFile(file.name, file.contents)).file, file);
    });
    it('should update state to contain new recents', function() {
      assert.deepEqual(fileApp(initialState, recieveRecents(recents)).list.recents, recents);
    });
    it('should update state to contain new file', function() {
      assert.include(fileApp(initialState, addFile(file2)).list.files, file2);
    });
    it('should update state to toggle creating file', function() {
      assert.isTrue(fileApp(initialState, toggleCreatingFile()).status.creatingFile);
    });
    it('should update state to re-toggle creating file', function() {
      let state1 = fileApp(initialState, toggleCreatingFile());
      assert.isFalse(fileApp(state1, toggleCreatingFile()).status.creatingFile);
    })
    it('should update state to reflect file changes', function() {
      assert.include(fileApp(initialState, updateFile(updatedText)).file.contents, updatedText);
    });
    it('should update state to show closed file', function() {
      assert.isFalse(fileApp(initialState, closeFile()).status.fileOpen);
    });
    it('should update state to show deleted file', function() {
      let state1 = fileApp(initialState, addFile(toDelete));
      assert.notInclude(fileApp(state1, fileDeleted(toDelete)).list.files, toDelete);
    });
    it('should update state to close open file due to deletion', function() {
      let state1 = fileApp(initialState, recieveFile(file.name, file.contents));//Open file
      let state2 = fileApp(state1, activeFileDeleted());//Delete opened file
      assert.isTrue(!state2.fileOpen);
    });
    it('should update state to show new dialog fileName', function() {
      assert.include(fileApp(initialState, updateDialogFilename(updatedDialogFilename)).creatingDialog.curName, updatedDialogFilename);
    });
    it('should update state to show dialog error', function() {
      assert.include(fileApp(initialState, dialogError(dialogTestError)).creatingDialog.error, dialogTestError);
    });
  });
});
