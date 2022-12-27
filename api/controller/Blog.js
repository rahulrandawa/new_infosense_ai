const BlogModelSchema = require("../model/Blog");
const { message } = require("../common/Message");

//save blog data
const createBlog = async (req, res) => {
    try {
        const { file } = req;
        console.log("file", file)
        const { title, description } = req.body
        console.log("req.body", req.body)
        const saveBlog = await BlogModelSchema.create({
            title,
            image: file.filename,
            description,
        });
        return res.status(200).json({
            message: message.BLOG_ADDED,
            data: saveBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//get blog list
const blogList = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        let condition = {};
        const getList = await BlogModelSchema.find(condition)
            .limit(limit * 1)
            .skip((page - 1) * limit)
        const totalgetList = await BlogModelSchema.countDocuments(condition);
        if (!totalgetList) {
            return res.status(400).json({
                message: message.DATA_NOT_FOUND, 
            });
        }
        return res.status(200).json({
            TotalgetList: totalgetList, 
            message: message.BLOG_DATA_LIST,  
            getList,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//update blog section - Id
const updateBlog = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateBlog = await BlogModelSchema.findOne({ _id: id });
        if (!updateBlog) {
            return res.status(404).json({
                message: message.DATA_NOT_FOUND,
            });
        }
        await BlogModelSchema.updateOne({ _id: id }, { $set: req.body, })
        console.log("req.body,", req.body)
        return res.status(200).json({
            message: message.BLOG_UPDATED,
            data: updateBlog,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//delete section
const deleteBlogData = async (req, res, next) => {
    try {
        //const deleteuser = await user.find()
        const id = req.params.id;
        const dataDelete = await BlogModelSchema.findOne({ _id: id });
        if (dataDelete) {
            return res.status(404).json({
                message: message.DATA_NOT_FOUND, 
            });
        }
        await BlogModelSchema.deleteOne({ _id: id })
        return res.status(200).json({
            message: message.BLOG_DELETED
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE, 
        });
    }
};


module.exports = {
    createBlog,
    blogList,
    updateBlog,
    deleteBlogData

}