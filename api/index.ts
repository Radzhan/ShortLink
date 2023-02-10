import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import linksRouter from "./routers/links";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use("/", linksRouter);

const run = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect("mongodb://localhost/shorten");

  app.listen(port, () => {
    console.log("we are live on " + port);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
