const AboutUsModel = require("../model/About-us")
const { message } = require("../common/Message")
const path = require("path");


const createHeader = async (req, res) => {
    try {
        let header = new AboutUsModel({
            title: req.body.title,
            message: req.body.message
        });
        if (req.files) {
            // header.image = req.file .path;
            let path = "";
            req.files.forEach(function (files, index, arr) { 
                path = path + files.path + ",";
            });
            path = path.substring(0, path.lastIndexOf(","));   
            header.image = path; 
        }
        await header.save();
        console.log(header)  
        return res.status(200).json({
            message: message.HEADER_CREATED,  
            data: header
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
}

// Get data for Header
const getheader = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("params", params)
        const headerDetails = await DashboardModel.findOne({ _id: id });
        console.log("headerDetails", headerDetails);
        if (headerDetails) {
            return res.status(200).json({
                message: message.HEADERDETAILS_SUCCESS,
                data: headerDetails,
            });
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//save cards
const createCards = async (req, res) => {
    try {
        const { cards } = req.body
        const cardsData = await AboutUsModel.create({
            cards
        })
        return res.status(200).json({
            message: message.CARD_ADDED,
            data: cardsData
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        });
    }
};

// get cards- Id
const getCards = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;

        console.log("params", params)
        const getData = await AboutUsModel.findOne({ cards: { $elemMatch: { id: id } } })
        console.log("cards", getData)
        if (getData) {
            return res.status(200).json({
                message: message.GET_CARD,
                data: getData
            });
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
}

// save paragraph data
const paragraphCreate = async (req, res) => {
    try {
        const { title, paragraph } = req.body
        const dataCreate = await AboutUsModel.create({
            title,
            paragraph
        });
        console.log("dataCreate", dataCreate)
        return res.status(200).json({
            message: "paragraph data create successfully!",
            data: dataCreate,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//get paragraph -Id
const getParagraphData = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("params", params)
        const getData = await AboutUsModel.findOne({ _id: id });
        console.log("getData", getData);
        if (getData) {
            return res.status(200).json({
                message: "Data get successfully!............",
                data: getData,
            });
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//save rviews data
const createReview = async (req, res) => {
    try {
        const { reviews } = req.body
        const ratingData = await AboutUsModel.create({
            reviews
        });
        console.log("ratingData", ratingData)
        return res.status(200).json({
            message: "Rating data create successfully!",
            data: ratingData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//get rating- Id
const getRating = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("params", params)
        const getRatingData = await AboutUsModel.findOne({ reviews: { $elemMatch: { id: id } } });
        console.log("getData", getRatingData);
        if (getRatingData) {
            return res.status(200).json({
                message: "Rating data get successfully!............",
                data: getRatingData,
            });
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};



module.exports = {
    createHeader,
    getheader,
    createCards,
    getCards,
    paragraphCreate,
    getParagraphData,
    createReview,
    getRating

}