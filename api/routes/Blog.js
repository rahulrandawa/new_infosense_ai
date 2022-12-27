const express = require("express");
const upload = require("../common/Upload");
const { createBlog, blogList, updateBlog, deleteBlogData } = require("../controller/Blog");
const BlogRouter = express.Router();

BlogRouter.post("/create-blog", upload.single("image"), createBlog);
BlogRouter.put("/update-blog/:id", updateBlog)
BlogRouter.get("/get-blogList", blogList)
BlogRouter.delete("/delete-blog/:id", deleteBlogData)

module.exports = BlogRouter;