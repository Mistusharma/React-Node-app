const userService = require("../Services/index");
const bcrypt = require('bcrypt');
const saltRounds = 5;
const nodemailer = require('nodemailer');
const stripe = require('stripe')('sk_test_51NdXVcSGzgSB3u6BrFY132BOLrx3zZUJne3pNh1tB5OVDQOwADTnZJjyZL3kjSzPrGzisJIUMv9gMqo7OcXemDkB00v71b3h0x');
const jwt = require('jsonwebtoken');
async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await userService.createUser({ name, email, password });
    res.status(200).send({ message: "User created successfully", token: newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}



async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log("email: ", email);
    const newUser = await userService.loginUser({ email, password });
    console.log("newUser: ", newUser);
    res.status(201).send({ message: "login successfully", newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}


function generateToken() {
  return Math.random().toString(36).substr(2); // Example random token generation
}

async function forgetPassword(req, res) {
  try {
    const { email } = req.body;
    const token = jwt.sign({ email: email }, "Kajal123", { expiresIn: '1min' });

    const link = `http://localhost:3000/reset?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'minikajal123@gmail.com',
        pass: 'tbgb hvzu oizg atqx',
      },
    });
    const mailOptions = {
      from: 'minikajal123@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h2 style="color: #333;">Password Reset</h2>
          <p>You've requested a password reset for your account.</p>
          <p>Please click the following link to reset your password:</p>
          <a href="${link}">${link}</a>
          <p>This link will expire in 5 minutes.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>Thank you!</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error occurred:', error);
        res.status(500).send({ status: 'error', message: 'Failed to send email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send({ status: 'success' });
      }
    });
  }
  catch (error) {
    console.error('Error:', error);
    res.status(400).send({ status: 'error', message: error.message });
  }
}

async function payment(req, res) {
  let { product } = req.body;
  const linedItems = product.map((product) => ({
    price_data: {
      currency: 'inr',
      product_data: {
        name: product.dish
      },
      unit_amount: product.price * 100
    },
    quantity: product.qnty
  }));
  try {
    const session = await stripe.checkout.sessions.create({
      payment_methods_types: ["card"],
      line_items: [
        {
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      cancel_url: 'https://example.com/cancel',
      success_url: 'https://example.com/success',
    });
    console.log("session", session);
    res.json({
      message: "Payment successful",
      success: true
    })
  } catch (error) {
    console.log("Error", error)
    res.json({
      message: "Payment failed",
      success: false
    })
  }
}

async function resetPassword(req, res) {
  try {
    const { email, password } = req.body;
    const newUser = await userService.resetPassword(email, password);
    console.log("newUser: ", newUser);
    if (newUser.status === "error") {
      return res.status(404).json({ error: newUser.message });
    }
    res.status(201).send({ message: "success", newUser });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).send({ message: error.message });
  }
}
async function getUser(req, res) {
  try {
    const { email } = req.query;
    const newUser = await userService.getUser({ email });
    console.log("newUser: ", newUser);
    res.status(201).send({ message: "User created successfully", newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}


async function profileUser(req, res) {
  try {
    const { name, email, address, city, state, country, phoneNumber } = req.body;
    // const { image } = req.file.path;

    const newUser = await userService.profileUser(name, email, address, city, state, country, phoneNumber);
    res.status(200).send({ message: "User  profile created successfully", newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}



async function imageUser(req, res) {
  try {
    const image = req.file;
    console.log("image: ", image);
    // const email = req.body.email
    const newUser = await userService.imageUser({ image });
    res.status(200).send({ message: "User  profile created successfully", newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.query;
    const { name } = req.body
    console.log("name: ", name);
    const newUser = await userService.updateUser({ id, name });
    console.log("newUser: ", newUser);
    res.status(201).send({ message: "User updates successfully", newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.query;
    const newUser = await userService.deleteUser({ id });
    console.log("newUser: ", newUser);
    res.status(201).send({ message: "User deleted successfully", newUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

async function deleteName(req, res) {
  try {
    const id = req.query.id; // Assuming you have a user ID from the request
    console.log("id: ", id);
    const updatedUser = await userService.deleteName(id);
    console.log("updatedUser: ", updatedUser);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
module.exports = { createUser, getUser, forgetPassword, payment, profileUser, resetPassword, updateUser, imageUser, deleteUser, deleteName, loginUser };
