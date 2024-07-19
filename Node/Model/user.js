
const mongoose = require("mongoose")
const user = new mongoose.Schema({
email:
{type:String},
firstName:{type:String},
lastName:{type:String},
roll:{ type:Number
},
phone:{type:Number},
password:{
   type:String
},
confirmPassword:{
   type:String
}   


})
module.exports = mongoose.model('user',user)