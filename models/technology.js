var mongoose   = require('mongoose');

var technologySchema = mongoose.Schema({
  name:         { type: String,
                unique: true },
  parent:       { type: String },
  children:     { type: [ String ] },
  articles:     { type: [ String ] },
  discussions:  { type: [ Number ]}
});

var Technology = mongoose.model('technology', technologySchema);

var dbSetings = require('../config/database');

mongoose.connect(dbSetings.url ,{ useNewUrlParser: true}, (err, client) => {
  if (err)
    console.log('Error: Can\'t connect to database: ', err);
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
   // Modified for testing purposes.
   Technology.findOne({}, callback)
//   Post.find({'name' : name}, callback)
 };


module.exports = mongoose.model('Technology', technologySchema)
