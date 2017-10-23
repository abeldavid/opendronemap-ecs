console.log('Loading function');

const AWS = require('aws-sdk');
var params = require('odm-task-definition.json');

exports.handler = function(event, context, callback) {
    console.log("\n\nLoading handler\n\n");
    var requestBody = JSON.parse(event.body);
    const ecs = new AWS.ECS();
    ecs.registerTaskDefinition(params, function(err, data) {
        if (err) {
            console.log(err.stack);
            const response = {
              statusCode: 503,
              headers: {
              "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ "message": "Server error " + err.stack })
          };
          callback(null, response);
        } else {
          console.log(event);
          const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
              "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
            },
            body: JSON.stringify({ "message": "Task registered." })
          };
          callback(null, response);
        }
    });
};
