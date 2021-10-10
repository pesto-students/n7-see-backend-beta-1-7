var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var citySchema = new Schema({
	
	city:{
        type:String,
        required:true
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true
    }
}),

City = mongoose.model('city', citySchema);

module.exports = City;

