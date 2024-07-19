const model = require("../Model/schema");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const saltRounds = 5;
async function createUser({ name, email, password }) {
  try {
    const existingUser = await model.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const a = await bcrypt.hash(password, saltRounds)
    const newUser = await model.create({ name, email, password});
    const token = jwt.sign({ email: newUser.email }, "Kajal123", { expiresIn: '41h' });

    return newUser,token;
  } catch (error) {
    throw new Error(error.message);
  }
}


async function loginUser({ email, password }) {
  console.log("email: ", email);
  try {
    const existingUser = await model.findOne({ email });
    console.log("existingUser: ", existingUser);
    if (!existingUser) {
      throw new Error("User not exists");
    }
    const loginSeller = await model.findOne(
      { $or: [{ email, password }] }
    );
    const token = jwt.sign({ email: loginSeller.email }, "Kajal123", { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
}



async function forgetPassword(email) {
  try {
    let otp = ""
    for (let index = 0; index < 5; index++) {
      otp += Math.floor(Math.random() * 10).toString();
    }
    console.log(otp);
    const existingUser = await model.findOneAndUpdate(
      { email: email },
      { otp: otp },
      { new: true }
    );
    if (!existingUser) {
      return { status: "error", message: "Email not found" }
    }
    return existingUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function resetPassword(email, password) {
  try {
    const existingUser = await model.findOne({ email });
    console.log("existingUser: ", existingUser);
    if (existingUser) {
      const updatedUser = await model.updateOne({ email }, { password });
      return updatedUser;
    }
    else {
      return { status: "error", message: "Invalid otp" }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUser({ email }) {
  try {
    const existingUser = await model.find({ email });
    console.log("newUser: ", existingUser);
    return existingUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function profileUser(name, email, address, city, state, country, phoneNumber) {
  // console.log("name, email,address,city,state,country,phoneNumber ,image: ", name, email,address,city,state,country,phoneNumber ,image);
  try {
    const profileUser = await model.create({ name, email, address, city, state, country, phoneNumber });

    return profileUser;
  } catch (error) {
    throw new Error(error.message);
  }
}


async function imageUser({ image }) {
  try {
    // const exist = await model.findOne({ email });
    // if (exist) {
    //   exist.image = image;
    //   const updatedUser = await exist.save();
    const updatedUser = await model.create({image});
      console.log("updatedUser: ", updatedUser);
    return updatedUser;
  // }
  } catch (error) {
  throw new Error(error.message);
}
}
async function updateUser({ id, name }) {
  try {
    const existingUser = await model.findOne({ _id: id });
    console.log("newUser: ", existingUser);
    existingUser.name = name;
    existingUser.save();
    return existingUser;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function deleteUser({ id }) {
  try {
    const existingUser = await model.deleteOne({ _id: id });
    console.log("newUser: ", existingUser);
    return existingUser;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function deleteName({ id }) {
  try {
    const updatedUser = await model.updateOne(id, { $unset: { name: "" } },);
    console.log("updatedUser: ", updatedUser);
    return updatedUser;
  } catch (err) {
    throw new Error(err.message);
  }
}
module.exports = { createUser, getUser, profileUser, resetPassword, forgetPassword, loginUser, imageUser, updateUser, deleteUser, deleteName };
