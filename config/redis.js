module.exports = function(client) {
  client.on('error', function(err) {
    console.log(err);
  });
  client.on('connect', function() {
    if(process.env.NODE_ENV == "development")
      console.log("Redis connected to server");
  });
}
