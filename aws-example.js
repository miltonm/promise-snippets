//http://stackoverflow.com/questions/28953211/promisify-aws-sdk-via-bluebird
var SES = new Promise.promisifyAll(new AWS.SES());

SES.listVerifiedEmailAddressesAsync().then(function (err,emails) {
    console.log('p',err,emails);
});


// http://stackoverflow.com/questions/26475486/how-do-i-promisify-the-aws-javascript-sdk
var Promise = require("bluebird");

var AWS = require('aws-sdk');
var dynamoDbConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
};
var dynamoDb = new AWS.DynamoDB(dynamoDbConfig);
Promise.promisifyAll(Object.getPrototypeOf(dynamoDb));

// https://www.npmjs.com/package/aws-promised
// https://github.com/CascadeEnergy/aws-promised
