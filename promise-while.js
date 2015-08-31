var Promise = require('bluebird');

var promiseWhile = function(test, action, value) {
  var p = Promise.method(function(value) {
    if(!test(value)) {
      return value;
    }
    return action(value)
           .then(p);
  });

  return p(value);
}


var show = function(count) {
  console.log('show: ', count);
  return Promise.delay(null, 1000)
    .then(function() {
      return ++count;
    });
}

var test = function(count) {
  return (count < 10) ? true: false;
}

promiseWhile(test, show, 0)
 .then(function() {
   console.log("All Done.");
 });

