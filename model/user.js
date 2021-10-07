var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	
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
    city:{
        type:String,
    },
    gender:{
        type:String,
    },
	password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"Active"
    },
    mobno:{
        type:String,
    },
    address:{
        type:String,
    },
    createddate:{
        type:String,
        required:true
    },
    user_id:{
        type:Number,
    },
	role:{
        type:String,
        required:true,
        default:"user"
    },
    image:{
        type:String
    },
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