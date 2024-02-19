import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const { DB_URL } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

// Close the connection when the application is shutting down
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("Connection closed gracefully.");
    process.exit(0);
  } catch (error) {
    console.error("Error closing the database connection:", error);
    process.exit(1);
  }
});

export default connectDB;
