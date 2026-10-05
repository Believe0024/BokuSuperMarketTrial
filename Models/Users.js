//Mongoose
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//User Schema
const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  HasAdminAccess: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['superadmin', 'storekeeper', 'salesperson'],
    default: 'salesperson',
  },

},
  {timestamps: true} //Date created and updated at
);

//create model from schema
const User = mongoose.model("User", userSchema); 

module.exports = User; //export the User model for use in other files
