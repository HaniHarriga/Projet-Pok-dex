const { model, Schema } = require("mongoose");

const UserModel = new Schema({
  username: String,
  password: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("User", UserModel, "users");
