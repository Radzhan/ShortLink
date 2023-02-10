import express from "express";
import Url from "../model/Url";

const linksRouter = express.Router();

linksRouter.post("/", async (req, res) => {
  try {
    const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let rs = "";
    const getRandomWord = async () => {
      for (let i = 0; i < 6; i++) {
        rs += abc[Math.floor(Math.random() * abc.length)];
      }
      return rs;
    };
    getRandomWord();

    const result = await Url.findOne({ shortUrl: rs });

    if (result) {
      getRandomWord();
    }

    const urlData = {
      originalUrl: req.body.url,
      shortUrl: rs,
    };

    const NewUrl = new Url(urlData);

    try {
      await NewUrl.save();
      return res.send(NewUrl);
    } catch (e) {
      return res.sendStatus(400).send(e);
    }
  } catch {
    res.sendStatus(500);
  }
});

linksRouter.get("/:shortUrl", async (req, res) => {
  try {
    const result = await Url.findOne({ shortUrl: req.params.shortUrl });

    if (!result) {
      return res.sendStatus(404);
    }

    res.status(301).redirect(result.originalUrl);
  } catch {
    res.sendStatus(500);
  }
});

export default linksRouter;
