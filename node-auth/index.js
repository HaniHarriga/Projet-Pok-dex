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

// either set the strictQuery to true to supress warning
mongoose.set("strictQuery", true);

mongoose.connect(
  "mongodb+srv://Hani:Hani35@ipssi.xotg38y.mongodb.net/?retryWrites=true&w=majority",
  (error, sucess) => {
    if (error) {
      console.log("Authentification failed");
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
