const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, },
  // otp:{type:Number},
  email: { type: String, },
  password: { type: String, },
  // address:{ type:String},
  // city:{ type:String},
  // country:{ type:String},
  // phoneNumber:{ type:String},
  image:{type:String}
});

module.exports = mongoose.model("userSchema", userSchema);



