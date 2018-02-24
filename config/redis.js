const redis = require('redis');

var client  = redis.createClient();
module.exports = client;
