const mongoose = require("mongoose")
const admin = new mongoose.Schema({
   roll: {
      type: Number
   },
   firstName: { type: String },
})
module.exports = mongoose.model('admin', admin)