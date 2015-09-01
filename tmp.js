var Promise = require('bluebird');

var promiseWhile = function(condition, action) {
  var resolver = Promise.defer();

  var loop = function() {
    if (!condition()) return resolver.resolve();
    return Promise.cast(action())
      .then(loop)
      .catch(resolver.reject);
  };

  process.nextTick(loop);

  return resolver.promise;
  
};

var promiseWhile = Promise.method(function(condition, action) {
  if (!condition()) return;
  return action().then(promiseWhile.bind(null, condition, action));
});



var count = 0;
promiseWhile(function() {
  return count < 10;
}, function() {
  return db.getUser(email)
    .then(function(res) {
      logger.log(res);
      count++;
      resolve();
    });
}).then(function() {
  console.log('all done');
});

//////////////////////////////////////////////////////////////////////////////
var Q = require('q');

function promiseWhile(condition, body) {
  var done = Q.defer();
  function loop() {
    if(!condition()) return done.resolve();
    Q.when(body(), loop, done.reject);
  }
  Q.nextTick(loop);
  return done.promise;
}

/////////////////////////////////////////////////////////////////////////////

var Promise = require('bluebird');
var i = 0;
var counter = Promise.method(function() {
  return i++;
});

function getAll(max, results) {
  var results = results || [];
  return counter().then(function(result){
    results.push(result);
    return (result < max) ? getAll(max, results): results;
  });
}

getAll(10).then(function(data) {
  console.log(data);
});

/////////////////////////////////////////////////////////////////////////////
// Good //

var promiseFor = Promise.method(function(condition, action, value) {
  if(!condition(value)) { 
    return value;
  }
  return action(value)
      .then(promiseFor.bind(null, condition, action));
});


promiseFor(function(count) {
  return count < 10;
}, function(count) {
  return db
          .getUser(email)
          .then(function(res) {
            logger.log(res);
            return ++count;
          });
}), 0)
.then(console.log.bind(console, 'all done'));

//////////////////////////////////////////////////////////////////////////////
//https://gist.github.com/victorquinn/8030190

var promiseWhile = function(condition, action) {
  return new Promise(function(resolve, reject) {
    var loop = function() {
      if (!condition()) return resolve();
      return Promise.cast(action())
        .then(loop)
        .catch(function(e) {
          reject(e);
        });
    };
    process.nextTick(loop);
  });
};


//////////////////////////////////////////////////////////////////////////////
// https://github.com/petkaantonov/bluebird/wiki/Promise-anti-patterns#the-deferred-anti-pattern
// When should you use deferreds ?
//setTimeout that returns a promise
function delay(ms) {
    var deferred = Promise.pending();
    setTimeout(function(){
        deferred.resolve();
    }, ms);
    return deferred.promise;
}

//////////////////////////////////////////////////////////////////////////////
//https://gist.github.com/spion/8009559
