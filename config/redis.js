module.exports = function(client) {
  client.on('error', function(err) {
    console.log(err);
  });
  client.on('connect', function() {
    console.log("Redis connected to server");
  });
}
