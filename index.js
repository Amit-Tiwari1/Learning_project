import express from "express";
import cors from "cors";
import riderRouter from './src/routers/rider.router.js';
import userRouter from "./src/routers/user.router.js"
import connectDB from "./src/db/index.js";

const app = express();

// CORS middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Accept JSON files
app.use(express.json({ limit: "20kb" }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static("public"));

// Mount routers
app.use('/api/v1', riderRouter);
app.use('/api/v1', userRouter);

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port :${PORT}`);
});
