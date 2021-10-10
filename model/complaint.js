var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var complaintSchema = new Schema({
	
	from:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
	subject:{
        type:String,
        required:true
    },
	content:{
        type:String,
        required:true
    },
    complaint_id:{
        type:Number
    },
    reply:{
        type:String,
    },
    replydate:{
        type:String,
    },
    createddate:{
        type:String,
        required:true
    },
	
}),

Request = mongoose.model('complaint', complaintSchema);

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