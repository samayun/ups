import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // ... additional fields can be added here
});

// Create the Account model
const Account =
  mongoose.models.Account || mongoose.model("Account", accountSchema);

export default Account;
