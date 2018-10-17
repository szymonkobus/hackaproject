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
 * @param {String}   username
 * @param {String}   password
 * @param {Function} done
 */
passport.use('local-signup', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  },
  (_username, _password, done) => {
    User.findOne({'local.username': _username}, (err, db_user) =>{
      if(err) return done(err);
      if(db_user){
        console.log("Name already taken");
        return done(null, false);
      }else{
        var newUser = new User();
        newUser.local.username = _username;
        newUser.local.password = newUser.generateHash(_password);
        newUser.save( err => {
          if(err){
              console.log("error: user not saved");
              return done(err, null);
              //TODO: how to do it such that it doesnt go thorough uppon an error
          }else{
            console.log("New user " + newUser.local.username);
            return done(null, newUser);
        }});
      }})
  }));

/**
 * Custom local strategy for login.
 *
 * @param {String}   username
 * @param {String}   password
 * @param {Function} done
 */
passport.use('local-login', new LocalStrategy({
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true
  },
  (req, _username, _password, done) => {
    User.findOne({'local.username': _username}, (err, db_user) =>{
      console.log(db_user);
      if(err) return done(err);
      if(!db_user){
        console.log("User not in database.");
        return done(null, false);
      }

      if(!db_user.validPassword(_password, db_user)){
        console.log("Wrong password.")
        return done(null, false);
      }

      return done(null, db_user);
    })
  }));
};
