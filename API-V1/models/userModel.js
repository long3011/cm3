const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    membership_status: { type: String, required: true },
    bio: { type: String },
    address: { type: String, required: true },
    profile_picture: { type: String, required: false }
  }, { timestamps: true, versionKey: false 

  });

  userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username });
    if (!user) throw new Error("Invalid username");
    if (user.password !== password) throw new Error("Invalid password");
    return user;
  };

  module.exports = mongoose.model('User', userSchema);