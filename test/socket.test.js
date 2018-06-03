const io = require('socket.io-client');
const assert = require('chai').assert;
const killable = require('killable');

var socket, server;
const fileName = 'r12312', url='http://localhost:8080';

process.env.NODE_ENV = "test";

//TODO:Add beforeEach() & afterEach() to all describe()'s except #connect
//TODO:Fix server shutdown
//TODO:Add asserts

describe('Socket', function() {
  before(function() {
    server = require('../server.js');
    killable(server);
  });
  after(function() {
    server.kill(function() {});
  });
  describe('#connect', function() {
    it('should return a non-null object', function() {
      socket = io.connect(url);
      assert.typeOf(socket, 'object');
    });
    it('should return a list of all files in an array', function(done) {
      socket.on('files', function(files) {
        socket.disconnect();
        if(typeof(files == 'Array'))
          done();
        else
          done('did not return array');
      });
    });
    it('should return a list of all recent files in an array', function(done) {
      socket = io.connect(url);
      socket.on('recentFiles', function(recents) {
        socket.disconnect();
        if(typeof(recents == 'Array'))
          done();
        else
          done('did not return array');
      });
    });
  });
  describe('#create', function() {
    it('should send a fileCreated event', function(done) {
      socket = io.connect(url);
      socket.emit('fileCreate', fileName);
      socket.on('currentFileCreated', function(name) {
        socket.disconnect();
        if(fileName == name)
          done();
        else
          done('incorrect filenames');
      });
    });
    it('should give an error due to name conflict', function(done) {
      socket = io.connect(url);
      socket.emit('fileCreate', fileName);
      socket.on('fileTaken', function(name) {
        socket.disconnect();
        if(fileName == name)
          done();
        else
          done('incorrect filenames');
      });
    });
  });
  describe('#modify', function() {
    it('should give an empty file', function(done) {
      socket = io.connect(url);
      socket.emit('fileReq', fileName);
      socket.on('fileReq', function(file) {
        socket.disconnect();
        if(file.fileName == fileName && file.fileContents === "")
          done();
        else
          done('did not recieve file properly');
      });
    });
  });
  describe('#delete', function() {
    it('should delete a file', function(done) {
      socket = io.connect(url);
      socket.emit('delete', fileName);
      socket.on('delete', function() {
        socket.disconnect();
        done();
      });
    });
  })
});
