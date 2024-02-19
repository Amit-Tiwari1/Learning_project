import mongoose from "mongoose";

const RiderSchema = new mongoose.Schema(
  {
    // Rider_Id: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    //     index: true
    // },
    fullName: {
      type: String,
      required: true,
    },
    email: {
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
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    adharCard: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{12}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Aadhar Card number!`,
      },
    },
    drivingLicense: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be at least 18"],
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);

const Rider = mongoose.model("Rider", RiderSchema);

export default Rider;
