const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./controller/user");

const app = express();
const port = 5000;
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://ryan953:Mercedesc63amg@ipssicluster.hkoeagh.mongodb.net/Pokedex?retryWrites=true&w=majority",
  (error, sucess) => {
    if (error) {
      console.log("connection error");
    } else {
      console.log("DB connected");
    }
  }
);

app.post("/signup", userController.signup);
app.post("/singin", userController.singin);

app.listen(port, () => {
  console.log(`backend Running at Port:${port}`);
});
