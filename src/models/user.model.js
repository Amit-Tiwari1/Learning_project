import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    user_Name: {
      type: String,
      required: true,
    },
    user_Email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    user_PhoneNumber: {
      type: String,
      required: true,
    },
    Is_Active: {
      type: Boolean,
      default: true,
    },
    Is_deleted: {
      type: Boolean,
      default: false,
    },
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
    otp: {
      type: String,
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
