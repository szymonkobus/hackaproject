/**
 * Defines app route/logic for user pages.
 */
module.exports = function(app, passport) {
  var express = require('express');
  var router  = express.Router();

  var User    = require('../models/user');

  /**
   * GET users listing.
   *
   * @param {Object} req
   * @param {Object} res
   */
  router.get('/', function(req, res) {
    res.send('respond with a resource');
  });

  /**
   * Handles GET request for login page.
   *
   * @param {Object} req
   * @param {Object} res
   */
  router.get('/login', function(req, res) {
    res.render('login', {title : 'Login'});
  });

  /**
   * Processes login form POST request, authenticating username and password.
   *
   * @param {Object} req
   * @param {Object} res
   */
  router.post('/login', passport.authenticate('local-login', {
    failureRedirect : '/users/login_failed',
    failureFlash    : 'Invalid username or password'
  }),
  function(req, res) {
    console.log('Authentication successful!');
    req.flash('success', 'You are now logged in.');
    res.redirect('/users/profile');
    console.log(res.urlencoded);
  });

  /**
   * Handles GET request for register page.
   *
   * @param {Object} req
   * @param {Object} res
   */
  router.get('/register', function(req, res) {
    res.render('register', {title : 'Register'});
  });

  /**
   * Processes registration form POST request, creating user.
   *
   * @param {Object} req
   * @param {Object} res
   */
  router.post('/register', passport.authenticate('local-signup', {
    failureRedirect : '/users/signup_failed',
    failureFlash    : 'Username already taken. Try again.'
  }),
  function(req, res) {
    console.log('Registration successful!');
    req.flash('success', 'You are now signed up.');
    res.redirect('/users/profile');
    // TODO: Username not stored properly to display profile.
    console.log(res.urlencoded);
  });

  /**
   * Handles GET request for user profile.
   *
   * Can only be called when logged in - enforced using isLoggedIn middleware
   * function.
   *
   * @param {Object} req
   * @param {Object} res
   */
  router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {user : req.user.username});
    console.log("Logged in user: " + req.user.username);
  });

  /**
   * Handles GET request to log user out.
   *
   * @param {Object} req
   * @param {Object} res
   */
  router.get('/logout', function(req, res) {
    req.logout();
    // Flash?
    res.redirect('/');
  });

  return router;
};

// ==========
// MIDDLEWARE
// ==========

/**
 * Checks whether user is currently logged in.
 *
 * If logged in, then proceeds to next, else redirects to home page.
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log('User not logged in. Redirecting...');
    res.redirect('/');
  }
}
