//A collection of methods for reading and writing redis files

var setName = 'files';
var listName = 'recents';
var recentsLength = 10;

module.exports = function(redis){
  return {
    getAll : cb => {//Gets all redis members from the set
      redis.smembers(setName, (err, val) => {
        cb(val);
      });
    },
    getRecent: cb => {//Gets the last 10 members from the set
      redis.lrange(listName, 0, -1, (err, val) => {
        cb(val);
      });
    },
    getFile : (keyName, cb) => {//Gets the contents of a file
      redis.get(keyName, (err, val) => {
        if(!err)
          cb(val);
        else
          cb("Error: File not retrieved");
      });
    },
    update : (keyName, newVal) => {//Updates an existing file
      redis.exists(keyName, (err, exists) => {
        if(exists)
          redis.set(keyName, newVal);
      });
    },
    create : (keyName, errCB, okCB) => {//Creates a new file
      redis.exists(keyName, (err, exists) => {
        if(exists)
          errCB();
        else {
          redis.sadd(setName, keyName, okCB);//Adds the file to the set as ref
          redis.lpush(listName, keyName);//Adds file to the recents list
          redis.ltrim(listName, 0, recentsLength-1);//Trims list to last X files
          redis.set(keyName, '');//Adds actual file contents
        }
      });
    },
    delete : (keyName, cb) => {//Deletes a file
      redis.del(keyName, cb);
      redis.srem(setName, keyName);
      redis.lrem(listName, -10, keyName);
    },
    purge : () => {//Removes all files that are not in the master set
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
