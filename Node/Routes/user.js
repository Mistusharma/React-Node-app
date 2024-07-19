const express= require('express');
const userRouter = express.Router();
const userController = require("../Controller/userController");

userRouter.post("/signUp",userController.userCreate)
userRouter.post("/signIn",userController.userSingIn)
userRouter.put("/profile",userController.profileUpdate)
module.exports = userRouter;