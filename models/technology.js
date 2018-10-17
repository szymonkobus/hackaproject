var mongoose   = require('mongoose');

var technologySchema = mongoose.Schema({
  name:         { type: String,
                unique: true },
  parents:      { type: String }
  children:     { type: [ String ] }
  articles:     { type: [ String ] }
  discussions:  { type: [ Number ]}
});

var Post = mongoose.model('post', postSchema);

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
 module.exports.getTechByName = (name, callback) => {
   Post.find({'name' : name}, callback)
 };


module.exports.model = mongose.model('Post', postSchema)''
