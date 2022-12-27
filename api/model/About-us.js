const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AboutUsModelSchema = new Schema({

    title: {
        type: Schema.Types.String,
    },
    image: {
        type: Schema.Types.String,
    },
    message: {
        type: Schema.Types.String,
    },
    description: {
        type: Schema.Types.String,   
    },
    paragraph: {
        type: Schema.Types.String, 
    },
    reviews: [{
        title: { type: Schema.Types.String },
        description: { type: Schema.Types.String },            
        rating: { type: Schema.Types.String }
    }],
    cards: [{
        title: { type: Schema.Types.String },
        content: { type: Schema.Types.String }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})
const AboutUsModel = mongoose.model("about-us", AboutUsModelSchema);
module.exports = AboutUsModel;