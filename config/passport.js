/**
 * Configures strategies for passport. Sets up passport session, required for
 * persistent login sessions.
 */
module.exports = function(passport) {

//var mongoose    = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;

// Load User model
var User          = require('../models/user');

/**
 * Serializes user for the session.
 *
 * Called on login request.
 *
 * @param {Object}   user
 * @param {Function} done
 */
passport.serializeUser(function(user, done) {
  console.log('Serializing User');
  done(null, user);
});

/**
 * Deserializes user, called on all subsequent requests to load additional user
 * information on each request. User object attached as req.user.
 *
 * @param {Object}   user
 * @param {Function} done
 */
passport.deserializeUser(function(user, done) {
  console.log('Deserializing User');
  //  User.findById(id, function(err, user) {
  done(null, user);
});

// =======================
// CUSTOM LOCAL STRATEGIES
// =======================

/**
 * Custom local strategy for signup.
 *
 * TODO: Place credentials into MongoDB after encrypting password.
 *
 * @param {String}   username
 * @param {String}   password
 * @param {Function} done
 */
passport.use('local-signup', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  },
  function(username, password, done) {
    // TODO: Query DB here to check if user already exists. If so, throw error.
    //       Else create the user:
    var newUser = new User();

    newUser.local.username = password;
    newUser.local.password = newUser.generateHash(password);

    // TODO: Write new user to database.
    /*
    newUser.save(function(err) {
      if (err) {
        console.log("Error creating new user " + newUser.local.username + ".");
        done(null, false);
      } else {
        console.log("New user " + newUser.local.username + " successfully created.");
        done(null, newUser);
      }
    });
    */
    done(null, newUser);
  }));

/**
 * Custom local strategy for login.
 *
 * TODO: Verify login using MongoDB
 *
 * @param {String}   username
 * @param {String}   password
 * @param {Function} done
 */
passport.use('local-login', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  },
  // TODO: Query DB here to authenticate
  function(username, password, done) {
    var user = {
      username : username,
      password : password
    };

    if (user.username === 'foo' && user.password === 'bar') {
      console.log("Successful login for user " + user.username + ".");
      done(null, user);
    } else {
      console.log("Unsuccessful login for user " + user.username + ".")
      done(null, false);
    }
  }));
};
