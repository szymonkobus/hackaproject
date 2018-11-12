/**
 * Handles database interaction for technologies.
 */
var mongoose   = require('mongoose');

var technologySchema = mongoose.Schema({
  name:         { type   : String,
                  unique : true },
  parent:       { type   : String },
  children:     { type   : [ String ] },
  articles:     { type   : [ String ] },
  discussions:  { type   : [ Number ] }
});

var Technology = mongoose.model('technology', technologySchema);

var dbSetings = require('../config/database');

mongoose.connect(dbSetings.url ,{ useNewUrlParser: true}, (err, client) => {
  if(err) console.log('Error: Can\'t connect to database: ',err);
})

// ========
// METHODS
// ========

/**
 * Retrieves technology from database using names
 *
 * @param {String} name
 * @param {Function} callback
 */
 technologySchema.methods.getTechByName = (name, callback) => {
   Technology.find({'name' : new RegExp('^' + name + '$', 'i')}, callback)
 };

/**
 * Retrieves all technologies from database to be displayed on technology home page.
 *
 * @param {Function} callback
 */
 technologySchema.methods.getTechnologies = (callback) => {
   Technology.find({'parent' : ''}, callback)
 };


module.exports = mongoose.model('Technology', technologySchema)
