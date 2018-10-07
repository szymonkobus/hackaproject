//Handles database interaction for users.
var mongoose   = require('mongoose');
var bcrypt     = require('bcryptjs');

var userSchema = mongoose.Schema({
  // TODO: Allow login with Facebook/etc.
  local      : {
    username : { type: String,
                 unique: true  },
    password : { type : String }
  }
});

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

var User = mongoose.model('user', userSchema);

var dbSetings = require('../config/database');

mongoose.connect(dbSetings.url ,{ useNewUrlParser: true}, (err, client) => {
  if(err) console.log('Error: Can\'t connect to database: ',err);
})

/*
User.find({}).exec(function(err, docs){
  if(err) throw err;
  console.log(docs);
});
*/


/**
 * Retrieves user from database using user ID to identify them.
 *
 * @param {Object | String | Number} id
 * @param {Function}                 callback
 */

console.log(module.exports)

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};


/**
 * Retrieves user from database using user ID to identify them.
 *
 * @param {Object | String | Number} id
 * @param {Function}                 callback
 *

userSchema.method.getUserByName = (_name, callback) => {
  User.find({username : _name}, (err, user) => {
    if(err) callback(err, null);
    else callback(null, users[0]);
    });
  };
 */

/*
function adduser(_name, _password) {
  var temp_user = new User({local : {username : _name, password : _password}});
  temp_user.save( err => {
    if(err) console.log("error: user not saved")
  });
}
*/

console.log(module.exports)
module.exports = mongoose.model('User', userSchema);
