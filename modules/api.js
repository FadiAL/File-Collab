var express = require('express');

var router = express.router();

module.exports = function(redis){
  router.get('/:fileName', function(){
    //TODO:Add file response code
  });
  router.get('/all', function(){
    //TODO:Add file list response code
  });
}
