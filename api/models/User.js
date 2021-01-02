var bcrypt = require('bcryptjs');

module.exports = {
  attributes: {
    password: 'string',
    email: 'string',

    roles: {
      collection: 'rol',
      via: 'users'
    },

    permissions: {
      collection: 'permission',
      via: 'users'
    }
  },

  customToJSON: function() {
    return _.omit(this, ['password']);
  },
  beforeCreate: function(values, cb) {
    bcrypt.hash(values.password, 10, (err, hash) => {
      if (err) {return cb(err);}
      values.password = hash;
      cb();
    });
  }};
