
var sails = require('sails');

before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(50000);

  sails.lift({}, function(err) {
    if (err) {return done(err);}
    return done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
