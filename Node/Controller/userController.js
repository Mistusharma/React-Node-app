const userService = require("../Services/userService");
async function userCreate(req, res) {
   console.log("running");
   try {
      const { email, firstName, lastName, roll, phone, password, confirmPassword } = req.body;
      const a = await userService.userCreate({ email, firstName, lastName, roll, phone, password, confirmPassword })
      if (a.status === 409) {
         res.status(403).send({
            status: 409,
            message: a.message,
         });
      }
      else if (a.status === 403) {
         res.status(403).send({
            status: 403,
            message: a.message,
         });
      }
      else {
         res.status(200).send({ message: "User created successfully" }); // Send response here
      }
   }
   catch (Error) {
      console.log(Error);
   }
}


async function userSingIn(req, res) {
   try {
      const { email, password } = req.body;
      const a = await userService.userSingIn({ email, password })
      res.status(200).send({ message: "User login successfully", Token: a });
   }
   catch (Error) {
      console.log(Error);
   }
}


async function profileUpdate(req, res) {
   try {
      const { email,  lastName, phone, password, confirmPassword } = req.body;
      const a = await userService.profileUpdate({ email,  lastName, phone, password, confirmPassword})
      res.status(200).send({ message: "User login successfully", Token: a });
   }
   catch (Error) {
      console.log(Error);
   }
}
module.exports = { userCreate, userSingIn,profileUpdate }