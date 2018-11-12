//Handles database interaction for users.
var mongoose   = require('mongoose');
var bcrypt     = require('bcryptjs');

var userSchema = mongoose.Schema({
  // TODO: Allow login with Facebook/etc.
    local     : {
    username  : { type   : String,
                  unique : true },
    password  : { type   : String },
    interests : { type   : [String] }
  }
});

var User = mongoose.model('user', userSchema);

var dbSetings = require('../config/database');

mongoose.connect(dbSetings.url ,{ useNewUrlParser: true}, (err, client) => {
  if(err) console.log('Error: Can\'t connect to database: ',err);
})

// ========
// METHODS
// ========

/**
 * Generate hash for password.
 * @param {String} password
 */
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Check if password valid.         //q should you hash password?
 * @param {String} password
 */
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

/**
 * Retrieves user from database using user ID to identify them.
 *
 * @param {Object | String | Number} id
 * @param {Function}                 callback
 */
userSchema.methods.getUserById = function(id, callback) {
  User.findById(id, callback);
};

/**
 * Retrieves user profile from database using username to identify them.
 *
 * @param {Object | String | Number} id
 * @param {Function}                 callback
 */
userSchema.methods.getUserProfile = function(username, callback) {
  User.findOne({ 'local.username' : username }, callback);
};

module.exports = mongoose.model('User', userSchema);
