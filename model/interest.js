var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var interestSchema = new Schema({
	
	category:{
        type:Object,
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
    r_id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    req_id:{
        type:String,
    },
    status:{
        type:String,
        required:true,
    },
    image:{
        type:Array
    },
    createddate:{
        type:String,
        required:true
    },
    
	
}),

Interest = mongoose.model('interest', interestSchema);

module.exports = Interest;


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