//A collection of methods for reading and writing redis files

module.exports = function(redis){
  return {
    getAll : cb => {
      redis.keys('*', (err, val) => {
        cb(val.filter(name => name.indexOf('key:') < 0));
      });
    },
    getIf : () => {}, //TODO: Add method
    getFile : (keyName, cb) => {
      redis.get('keyName', (err, val) => {
        if(!err)
          cb(val);
      });
    },
    setFile : () => {} //TODO: Add method
  };
};
