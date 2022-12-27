const express = require("express");
const { updateUserProfile, logout, updatePassword, changePassword, getData, adminLogin } = require("../controller/Admin");
const upload = require("../common/Upload")
const UserRouter = express.Router();

UserRouter.post("/sign-in", adminLogin);
UserRouter.put("/update/:id",upload.single("image") ,updateUserProfile)
UserRouter.post("/logout", logout)
UserRouter.post("/updatePassword", updatePassword)
UserRouter.post("/changePassword", changePassword)
UserRouter.get("/data", getData)

module.exports = UserRouter;
