/**
 * Defines app route/logic for technology pages.
 */
var express = require('express');
var router  = express.Router();

/**
 * Handles GET request for technology home page.
 *
 * @param {Object} req
 * @param {Object} res
 */
router.get(/.*/, function(req, res) {
  res.render('technology', { title : req.url.replace("/", "")});
});

module.exports = router;
