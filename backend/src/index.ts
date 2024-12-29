import express from "express";
import router from "./app";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import databaseConnection from "./db/db";
import cors from "cors";

dotenv.config({
  path: "./.env",
});
/////////////////////////////////////
const port = process.env.PORT;
const app = express();

/////////////////////////////////////
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(router);
/////////////////////////////////////

/////////////////////////////////////
databaseConnection().then((response) => {
  console.log(response);
  app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
  });
});
