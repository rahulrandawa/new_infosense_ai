const EcommerceModelSchema = require("../model/E-commerce");
const { message } = require("../common/Message")


//save e-commerce data
const createHeaderData = async (req, res) => {
    try {
        const { file } = req
        const { title, image, message } = req.body
        const ecommerceData = await EcommerceModelSchema.create({
            title, 
            image: file.filename,
            message
        })
        return res.status(200).json({
            message: "E-commerce data save successfully!",
            data: ecommerceData
        })
    } catch (error) { 
        console.log(error);
        return res.status(500).json({ 
            message: message.ERROR_MESSAGE, 
        });
    }
}
//test dsdhgsdgsdg jsdhsdh
// Get data for Header
const getheaderData = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("params", params) 
        const headerDetails = await EcommerceModelSchema.findOne({ _id: id });
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

//save section data
const createSectionData = async (req, res) => {
    try {
        const { file } = req
        const { title, image, paragraph } = req.body
        const sectionData = await EcommerceModelSchema.create({
            title,
            image: file.filename,
            paragraph
        })
        return res.status(200).json({
            message: message.ECOMMERCE_ADDED,
            data: sectionData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
}

//get section data-Id
const getSectionData = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("params", params)
        const getData = await EcommerceModelSchema.findOne({ _id: id });
        console.log("getData", getData);  
        if (getData) {
            return res.status(200).json({
                message: "section data get successfully!.........",
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

// card data save
const createCard = async (req, res) => {
    try {
        const { cards } = req.body
        const cardData = await EcommerceModelSchema.create({
            cards
        })
        return res.status(200).json({
            message: "Cards data save successfully!",
            data: cardData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
}

//get card data - Id
const getCardData = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("parms", params)
        const cardData = await EcommerceModelSchema.findOne({ cards: { $elemMatch: { _id: id } } })
        console.log("cardData", cardData)
        if (cardData) {
            return res.status(200).json({
                message: "Card details get updated.........",
                cardData
            });
        }
        return res.status(404).json({
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        console.log("error............", error)
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
}




module.exports = {
    createHeaderData,
    getheaderData,
    createSectionData,
    getSectionData,
    createCard,
    getCardData
}
