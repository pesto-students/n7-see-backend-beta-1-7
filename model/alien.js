const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const alienSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    tech:{
        type:String,
        required:true
    },
    sub:{
        type:Boolean,
        required:false,
        default:false
    }

})

module.exports = mongoose.model('Alien',alienSchema);