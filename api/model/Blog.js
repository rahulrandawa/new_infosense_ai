const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BlogModelSchema = new Schema({

    title: {
        type: Schema.Types.String,
    },
    image: {
        type: Schema.Types.String,
    },
    description: {
        type: Schema.Types.String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})
const BlogModel = mongoose.model("blog", BlogModelSchema);
module.exports = BlogModel;