import express from "express";
import Url from "../model/Url";

const linksRouter = express.Router();

linksRouter.post("/links", async (req, res) => {
  try {
    const urlData = {
      originalUrl: req.body.url,
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
    const result = await Url.findById(req.params.shortUrl);

    if (!result) {
      return res.sendStatus(400);
    }

    return res.send(result);
  } catch {
    res.sendStatus(500);
  }
});

export default linksRouter;
