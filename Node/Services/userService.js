const userModel = require("../Model/user")
const admin = require("../Model/admin")

const jwt = require("jsonwebtoken")
async function userCreate({ email, firstName, lastName, roll, phone, password, confirmPassword }) {
   // let existingUser = await userModel.findOne({ roll, firstName });
   let existingUser = await admin.findOne({ roll, firstName });

   if (existingUser) {
      const data = await userModel.findOne({ email, lastName, phone, password, confirmPassword });
      if (data) {
         return {
            status: 403,
            message: "Data already exists",
         };
      }
      else {
         const key = await userModel.create({ email, firstName, lastName, roll, phone, password, confirmPassword });
         return key
      }
   } else {
      return {
         status: 409,
         message: "Data not  exists",
      };
   }
}

async function userSingIn({ email,  password }) {
   let existingUser = await userModel.findOne(  { $or: [{ email, password }] })
   if(existingUser){
      const token = jwt.sign({ email: existingUser.email }, process.env.jWT, { expiresIn: '24d' });
      return token;
   }
   else{
      console.log("no");
   }

}
async function profileUpdate({ email,  lastName, phone, password, confirmPassword }) {
   let existingUser = await userModel.findOneAndUpdate({ email,  lastName, phone, password, confirmPassword   })
return existingUser
}
module.exports = { userCreate,userSingIn,profileUpdate }

