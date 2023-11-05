import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is rerquired"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
  },
});

userSchema.pre("save", async function (next) {
  // return if password is not modified
  if (!this.isModified("password")) return next();

  // hash the password at the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});
userSchema.methods.checkPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
