//A collection of methods for reading and writing redis files

module.exports = function(redis){
  return {
    getAll : cb => {
      redis.keys('*', (err, val) => {
        val = val.filter(name => name.indexOf('key:') < 0);
        cb(val);
      });
    },
    getFile : (keyName, cb) => {
      redis.get(keyName, (err, val) => {
        if(!err)
          cb(val);
        else
          cb("Error: File not retrieved");
      });
    },
    update : (keyName, newVal) => {
      redis.exists(keyName, (err, exists) => {
        if(exists)
          redis.set(keyName, newVal);
      });
    },
    create : (keyName, errCB, okCB) => {
      redis.exists(keyName, (err, exists) => {
        if(exists)
          errCB();
        else
          redis.set(keyName, '', okCB());
      });
    },
    delete : (keyName, cb) => {
      redis.del(keyName, cb);
    }
  }
};
