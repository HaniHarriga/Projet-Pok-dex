const UserModel = require("../models/user");

module.exports.signup = (req, res) => {
  console.log(req.body);

  // name is not exist already
  const newUser = new UserModel({
    name: req.body.name,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      res.send({ code: 200, message: "signup success" });
    })

    .catch((error) => {
      res.send({ code: 500, message: "signup error" });
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
