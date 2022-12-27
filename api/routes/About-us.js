const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { createHeader, getheader, createCards, getCards, paragraphCreate, getParagraphData, createReview, getRating } = require("../controller/About-us");

const AboutRouter = express.Router();
AboutRouter.post("/created-header", upload.array("image[]"), createHeader);
AboutRouter.get("/get-header/:id", getheader),
AboutRouter.post("/save-cards", createCards)
AboutRouter.get("/get-cards/:id", getCards),
AboutRouter.post("/create-paragraph", paragraphCreate),
AboutRouter.get("/get-data/:id", getParagraphData),
AboutRouter.post("/create-review", createReview),
AboutRouter.get("/get-rating/:id", getRating)

module.exports = AboutRouter;         