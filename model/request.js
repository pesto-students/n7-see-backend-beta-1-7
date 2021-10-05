var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new Schema({
	
	category:{
        type:String,
        required:true
    },
	productname:{
        type:String,
        required:true
    },
	description:{
        type:String,
        required:true
    },
	cost:{
        type:String,
        required:true
    },
    u_id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    req_id:{
        type:String,
    },
    status:{
        type:String,
        required:true,
        default:"Pending"
    },
    image:{
        type:Array
    },
    interest:{
        type:Array
    },
    createddate:{
        type:String,
        required:true
    },
    
	
}),

Request = mongoose.model('request', requestSchema);

module.exports = Request;


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