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
    failureRedirect : '/users/login',                           // reloaded the page, TODO: add warning of what happened
    failureFlash    : 'Invalid username or password'
  }),
  function(req, res) {
    console.log('Authentication successful!');
    req.flash('success', 'You are now logged in.');
    res.redirect('/users/profile/' + req.user.local.username);
    console.log(res.urlencoded);
  });

  /**
   * Handles GET request for register page.
   *
   * @param {Object} req
   * @param {Object} res
   */
  router.get('/register', function(req, res) {
    res.render('register', { title : 'Register' });
  });

  /**
   * Processes registration form POST request, creating user.
   *
   * @param {Object} req
   * @param {Object} res
   */
  router.post('/register', passport.authenticate('local-signup', {
    failureRedirect : '/users/register',                                //reload upon failure
    failureFlash    : 'Username already taken. Try again.'
  }),
  function(req, res) {
    console.log('Registration successful!');
    req.flash('success', 'You are now signed up.');
    res.redirect('/users/profile/' + req.user.local.username);
    // TODO: Username not stored properly to display profile.
    console.log(res.urlencoded);
  });

  /**
   * Handles GET request for any user profile.
   *
   * Looks user info up in database, then passes to renderer to create.
   *
   * @param {Object} req
   * @param {Object} res
   */
  router.get(/\/profile\/.*/, function(req, res) {
    var user_queried = req.url.replace('/profile/', "");
    User.getUserProfile(user_queried, function(err, result) {
      if (err) {
        console.log('ERROR: An error occurred retrieving user info from database.');
      } else {
        console.log(result);
        if (result == null) {
          console.log('No matching user profile with that username found.');
          res.redirect('/');
        } else {
          res.render('profile', { user_data : result });
        }
      }
    });
    console.log("User " + req.user.local.username + " requested page of : " + user_queried);
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
