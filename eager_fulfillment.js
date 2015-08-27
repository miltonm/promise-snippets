// Do promises get fulfilled eagerly or lazily ? 
// So there is this function that gives me a timer promise of 10 seconds
// At time=t I get the promise
// Wait for 15 seconds. Now time is t+15.
// Do a then on timer promise 
// When will the then get invoked at t+15 or t+15+10 ? 
// Ans: t+15

var Promise = require('bluebird');
var _ = require('lodash');
var p = Promise.delay(5000);
var t1,t2,t3; t1= _.now(); 
setTimeout(
  function() { 
    p.then(function() {
      t3 = _.now();
    }); 
    t2 = _.now()
  }, 
  5000);
console.log(t2 - t1);
console.log(t3 - t2);
