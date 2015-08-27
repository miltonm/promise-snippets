// Do promises get fulfilled eagerly or lazily ? My hypothesis if eager
// So there is this function that gives me a timer promise of 10 seconds
// At time=t I get the promise
// Wait for 15 seconds. Now time is t+15.
// Do a then on timer promise 
// When will the then get invoked at t+15 or t+15+10 ?

