var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
	
	category:{
        type:String,
        required:true
    }
}),

Category = mongoose.model('category', categorySchema);

module.exports = Category;

