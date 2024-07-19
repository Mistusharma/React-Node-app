const express = require("express");
const userController = require("../Controller/index");
const userService = require("../Services/index");
const demo = express.Router();
const secretKey = 'Kajal123';
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
// import fs from '../CTD.json'
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;

// // Create a transporter using SMTP
// const transporter = nodemailer.createTransport({
//   host: 'smtp.example.com',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'your_email@example.com',
//     pass: 'your_password',
//   },
// });

// // Define email options
// const mailOptions = {
//   from: 'your_email@example.com',
//   to: 'recipient@example.com',
//   subject: 'Test Email',
//   text: 'This is a test email from Nodemailer!',
// };

// // Send email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('Error occurred:', error);
//   } else {
//     console.log('Email sent:', info.response);
//   }
// });


// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   console.log("authHeader: ", authHeader);
//   const token = authHeader && authHeader.split(' ')[1];
//   console.log("token: ", token);
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `images/`) // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Use the original file name
  }
});
const upload = multer({ storage: storage });


demo.post("/create", userController.createUser);
demo.post("/login", userController.loginUser);
demo.post("/forget", userController.forgetPassword)
demo.post("/reset", userController.resetPassword)
demo.get("/get", userController.getUser);
demo.post("/profile", userController.profileUser);
demo.post("/profileImage", upload.single('image'), userController.imageUser);
demo.put("/update", userController.updateUser);
demo.delete("/delete", userController.deleteUser);
demo.delete("/deleteName", userController.deleteName);
module.exports = demo;