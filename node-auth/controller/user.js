//import bcryptjs from "bcryptjs";
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports.signup = async (req, res) => {
  console.log(req.body);

  // name is not exist already

  // HASHER PASSWORD
  const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
  const newUser = new UserModel();
  newUser.username = req.body.username;
  newUser.password = hashedPassword;

  console.log(hashedPassword);

  await newUser
    .save()
    .then(() => {
      res.send({
        code: 200,
        message: "signup success",
        password: hashedPassword,
      });
    })

    .catch((error) => {
      //res.send({ code: 500, message: "signup error" });
    });

  res.send("succes");
};

module.exports.singin = (req, res) => {
  console.log(req.body.name);

  // name and password match

  UserModel.findOne({ name: req.body.name })
    .then((res) => {
      console.log(res);

      // match password and req.body.password
      res.send({ code: 200, message: "user Found" });
    })
    .catch((err) => {
      res.send({ code: 500, message: "user not found" });
    });

  //newUser
  // .save()
  //.then(() => {
  //res.send({ code: 200, message: "signup success" });
  //})

  ///res.send({ code: 500, message: "signup error" });
  //});

  //res.send("succes");
};
