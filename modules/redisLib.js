//A collection of methods for reading and writing redis files

module.exports = function(redis){
  return {
    getAll : cb => {
      redis.keys('*', (err, val) => {
        val = val.filter(name => name.indexOf('key:') < 0);
        cb(val);
      });
    },
    getIf : () => {}, //TODO: Add method
    getFile : (keyName, cb) => {
      redis.get(keyName, (err, val) => {
        if(!err)
          cb(val);
        else
          cb("Error: File not retrieved");
      });
    },
    setFile : () => {} //TODO: Add method
  };
};
