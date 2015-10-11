var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/testdb');
// var db = mongoose.connection;
//db.locations.ensureIndex({ position: '2dsphere' }); 
var Schema = mongoose.Schema;
var LocationSchema = new Schema( {
position : Object,
 desc: String,
 isActive : Boolean
});
module.exports = mongoose.model('locations', LocationSchema);