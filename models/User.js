const mongoose = require('mongoose');
const TaskSchema = require('./Task');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: [TaskSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
