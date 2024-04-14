const mongoose = require("mongoose");
// Define mongoose schemas
const userSchema = new mongoose.Schema({
  email: { type: String },
  password: String,
  
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const chatRooms = new mongoose.Schema({
  roomId: String,
  CreatorName:String,
  CreatorId:String,

  
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Chatroom = mongoose.model("Chatrooms", chatRooms);

module.exports = {
  User,
  Admin,
  Chatroom,
};
