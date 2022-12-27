const express = require("express");
// const upload = require("../common/Upload");
const upload = require('../middleware/uploadMiddleware')
const {  headerCreate,createImageIcon, getimage, createReviews, getReviews, createContents, getContents,
    createHelp, getHelp, createDemo, demoDetails, getheader, cardCreate, getCard, createSection, getSection } = require("../controller/Dashboard");

const DashboardRouter = express.Router();

DashboardRouter.post("/add-created", upload.array("image[]"), headerCreate);
DashboardRouter.get("/get-header/:id",getheader)
DashboardRouter.post("/add-card",cardCreate),
DashboardRouter.get("/get-card/:id",getCard),
DashboardRouter.post("/add-icon", upload.array("image[]"), createImageIcon);
DashboardRouter.get("/get-image/:id", getimage);
DashboardRouter.post("/add-reviews", createReviews);
DashboardRouter.get("/get-rating/:id", getReviews);
DashboardRouter.post("/add-content", upload.array("image[]"), createContents);
DashboardRouter.get("/get-contents/:id", getContents);                          
DashboardRouter.post("/add-help", createHelp);
DashboardRouter.get("/helps/:id", getHelp);
DashboardRouter.post("/add-section",createSection),
DashboardRouter.get("/get-section/:id",getSection),
DashboardRouter.post("/add-demo", createDemo);                  
DashboardRouter.get("/get-demo/:id", demoDetails);

module.exports = DashboardRouter;               