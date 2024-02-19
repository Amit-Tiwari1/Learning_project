// import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import riderRouter from './src/routers/rider.router.js';
import userRouter from "./src/routers/user.router.js"

import { dbConnection } from "./src/db/index.js";

const app = express();
// cors middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);

//accept json file
app.use(express.json({ limit: "20kb" }));
//to url verify
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
// app.use(cookieParser());

// router
app.use('/api/v1', riderRouter);
app.use('/api/v1',userRouter)


app.listen(process.env.PORT, () => {
  try {
    dbConnection();
  } catch (error) {}
  console.log(`Server is running at port :${process.env.PORT}`);
});
