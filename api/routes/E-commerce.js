const express = require("express");
const upload = require("../common/Upload");
const { createHeaderData, getheaderData, getSectionData, createSectionData, createCard, getCardData } = require("../controller/E-commerce");

const EcommerceRouter = express.Router();

EcommerceRouter.post("/create-header", upload.single("image"), createHeaderData);
EcommerceRouter.get("/get-header/:id", getheaderData)
EcommerceRouter.post("/create-section", upload.single("image"),createSectionData );
EcommerceRouter.get("/get-section/:id",getSectionData)
EcommerceRouter.post("/create-card", createCard);
EcommerceRouter.get("/get-card/:id",getCardData)

module.exports = EcommerceRouter;