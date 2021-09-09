var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	
	u_id: Number,
	firstName:{
        type:String,
        required:true
    },
	lastName:{
        type:String,
        required:true
    },
	email:{
        type:String,
        required:true
    },
	password:{
        type:String,
        required:true
    },
	usertype:String
}),

User = mongoose.model('user', userSchema);

module.exports = User;


// const mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// const userSchema=new Schema({
// 	u_id:Number,
//     username:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
// 	password:{
//         type:String,
//         required:true
//     },
//     mobileno:{
//         type:String,
//         required:true
//     },
// 	usertype:{
//         type:String,
//         required:true
//     },

// })

// module.exports = mongoose.model('User',userSchema);