import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const dbConnected = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST_NAME,
    dialect: "mssql",
    logging: console.log,
  },
  
);

export const dbConnection = async () => {
  try {
    await dbConnected.authenticate();
    console.log("SQL Server Connected!!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Close the connection when the application is shutting down
process.on("SIGINT", async () => {
  try {
    await dbConnected.close();
    console.log("Connection closed gracefully.");
    process.exit(0);
  } catch (error) {
    console.error("Error closing the database connection:", error);
    process.exit(1);
  }
});

export default dbConnected;



// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

// const connectDB = async () => {
//   try {
//     const connectionInstance = await mongoose.connect(
//       `${process.env.MONGODB_URI}/${DB_NAME}`
//     );
//     console.log(
//       `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
//     );
//   } catch (error) {
//     console.log("MONGODB connection failed", error);
//     process.exit(1);
//   }
// };

// export default connectDB;
