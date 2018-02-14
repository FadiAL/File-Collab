//A collection of methods for reading and writing redis files

var setName = 'files';

module.exports = function(redis){
  return {
    getAll : cb => {
      redis.smembers(setName, (err, val) => {
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
        else {
          redis.sadd(setName, keyName, okCB);//Adds the file to the set as ref
          redis.set(keyName, '');//Adds actual file contents
        }
      });
    },
    delete : (keyName, cb) => {
      redis.del(keyName, cb);
      redis.srem(setName, keyName);
    },
    purge : () => {
      redis.keys('*', (err, vals) => {
        //The one filter to rule them all
        vals = vals.filter(key => key.indexOf('key:__rand')).filter(key => key != setName);
        for(var i = 0; i < vals.length; i++){
          redis.sadd('tempList', vals[i]);
        }
        redis.sdiff('tempList', [setName], (err, keys) => {
          for(var i = 0; i < keys.length; i++){
            console.log(keys);
          }
        });
        //And in the darkness del them
      });
    }
  }
};
