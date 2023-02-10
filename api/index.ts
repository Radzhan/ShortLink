import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import linksRouter from "./routers/links";

const app = express();
const port = 8000;

app.use('/', linksRouter);
app.use(express.json());
app.use(cors());

const run = async () => {
  await mongoose.connect("mongodb://localhost/shorten");

  app.listen(port, () => {
    console.log("we are live on " + port);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
