var Promise = require('bluebird');

var redis = require("redis"),
  client = redis.createClient();

Promise.promisifyAll(client);

client.on("error", function (err) {
  console.log("Error " + err);
});

module.exports = client;