var sails = require('sails');
const { datastores } = require('../config/datastores');

// Before running any tests...
before(function(done) {
  this.timeout(10000);

  sails.lift({
    hooks: { grunt: false, csrf: false },
    log: { level: 'warn' },
    models: {
      datastore: 'test',
      migrate: 'drop'
    }
  }, (err) => {
    if (err) { return done(err); }

    return done();
  });
});

after((done) => {
  sails.lower(done);

});
