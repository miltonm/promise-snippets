// From: https://github.com/petkaantonov/bluebird/issues/20#issuecomment-26675418

//There is a reference error with id because it was defined for a different function.

//However with this code, it works fine after the id reference error is fixed:

var redis = require("redis");
var Promise = require("bluebird");
Promise.longStackTraces();
var client = Promise.promisifyAll(redis.createClient());
var now = Date.now;

function allMovies() {
    return client.smembersAsync('movies.ids').map(function (id) {
        return client.hmgetAsync("movies:" + id,
            'title',
            'description',
            'director',
            'year',
            'rating',
            'id' //fetching id too
        );
    }).map(function (data) {
        return {
            id: data[5],
            title: data[0],
            description: data[1],
            director: data[2],
            year: data[3],
            rating: data[4],
            showtime: now() + data[5] * 3600
        };
    });
}

allMovies().then(function(movies){
    movies.forEach(function(movie){
        console.log(movie.title, movie.description);
    })
})
//It works fine and logs:

//a b
//a b
//a b
//a b
//Which is the data that was inserted with:

Promise.map([1, 2, 3, 4], function (id) {
    return client.saddAsync('movies.ids', id);
}).then(function () {
    return [1, 2, 3, 4]
}).map(function (id) {
    return client.hmsetAsync("movies:" + id, "title", "a", "description", "b");
});
