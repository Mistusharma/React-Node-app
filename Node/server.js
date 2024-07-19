
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors())
app.options(
  '*',
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
const port = process.env.PORT;
const user = require("./Routes/index")
const collection = require("../Node/Routes/collectionRoute")
const product = require("./Routes/productRoute");
const userCreate = require("./Routes/user")
app.use("/api", user)
app.use("/collection", collection)
app.use("/product", product)
app.use("/user",userCreate)
mongoose.connect(`${process.env.dbURL}`)
    .then(() => {
        console.log("Successfully connected to the database to ", process.env.dbURL);
    })
    .catch((err) => {
        console.log("Could not connect to the database", err);
        process.exit();
    });
app.listen(port, () => {
    console.log("Server listening ", port);
})
