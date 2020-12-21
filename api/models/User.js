var bcrypt = require("bcryptjs");

module.exports = {
  attributes: {
    password: 'string',
    email: 'string',
  },
  customToJSON: function() {
    // Retourne une copie du résultat sans le mot de passe
    return _.omit(this, ['password'])
  },
  beforeCreate: function(values, cb) {
    // Hash le password avant chaque création
    bcrypt.hash(values.password, 10, function(err, hash) {
      if (err) return cb(err);
      values.password = hash;
      cb();
    });
  }};
