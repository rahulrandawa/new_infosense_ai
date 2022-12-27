const DashboardModel = require("../model/Dashboard");
const { message } = require("../common/Message")


// save data for Header
const headerCreate = async (req, res) => {
    try {
        let header = new DashboardModel({
            title: req.body.title,
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
            success: true,
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

// save data for card
const cardCreate = async (req, res) => {
    try {
        const { cards } = req.body;
        let data = new DashboardModel({
            cards,
        });
        let cardData = await data.save();
        if (cardData) {
            return res.status(201).json({
                success: true,
                message: message.CARD_ADDED,
                response: cardData,
            });
        } else {
            return res.status(404).json({
                message: message.DATA_NOT_FOUND,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }

};

// get data for card
const getCard = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("id", id);
        const getCards = await DashboardModel.findOne({ cards: { $elemMatch: { _id: id } } });
        console.log("getCards", getCards);
        if (getCards) {
            return res.status(200).json({
                message: message.GET_CARD,
                data: getCards,
            });
        }
        console.log("getCards", getCards);
        return res.status(404).json({
            message: message.DATA_NOT_FOUND,
        });
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//save image - imageTitle
// const createImageIcon = async (req, res) => {
//     try {
//         let imageArray = [];
//         console.log("imageArray", imageArray)
//         req.files.forEach((element) => {
//             const file = {
//                 image: element.filename
//             }
//             imageArray.push(file);
//         })
//         console.log("file.........",)
//         const { title } = req.body
//         // console.log("image", image)  
//         const imageIcon = await DashboardModel.create({
//             title
//         });
//         console.log("imageIcon..........", imageIcon)
//         // console.log("imageIcon",imageIcon)
//         return res.status(200).json({
//             message: "image icon created sucessfully!",
//             data: imageIcon,   
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: message.ERROR_MESSAGE,
//         });
//     }
// };


const createImageIcon = async (req, res) => {
    try {
        let imageIcon = new DashboardModel({
            title: req.body.title,
        });
        if (req.files) {
            // imageIcon.image = req.file .path;
            let path = "";
            req.files.forEach(function (files, index, arr) {
                path = path + files.path + ",";
            });
            path = path.substring(0, path.lastIndexOf(","));
            imageIcon.image = path;
        }
        await imageIcon.save();
        console.log(imageIcon)
        return res.status(200).json({
            success: true,
            message: message.IMAGEICON_ADDED,
            data: imageIcon
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
}

// get title 
const getimage = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("params", params)
        const imageData = await DashboardModel.findOne({ _id: id })
        console.log("dataGet", imageData)
        if (imageData) {
            return res.status(200).json({
                message: message.GET_IMAGE_DATA,
                data: imageData
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

//save client reviews
const createReviews = async (req, res) => {
    try {
        const { reviews } = req.body
        const reviewData = await DashboardModel.create({
            reviews
        })
        return res.status(200).json({
            message: message.REVIEWS_ADDED,
            data: reviewData
        });
    } catch (error) {
        return res.status(500).json({

            message: message.ERROR_MESSAGE

        });
    }
};
//get reviews
const getReviews = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;

        console.log("params", params)
        const getRating = await DashboardModel.findOne({ reviews: { $elemMatch: { id: id } } })
        console.log("review", getRating)
        if (getRating) {
            return res.status(200).json({
                message: message.GET_REVIEWS,
                data: getRating
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

//save contents data
const createContents = async (req, res) => {
    try {
        let content = new DashboardModel({
            title: req.body.title,
            paragraph: req.body.paragraph
        });
        if (req.files) {
            // content.image = req.file .path;
            let path = "";
            req.files.forEach(function (files, index, arr) {
                path = path + files.path + ",";
            });
            path = path.substring(0, path.lastIndexOf(","));
            content.image = path;
        }
        await content.save();
        console.log(content)
        return res.status(200).json({
            success: true,
            message: message.CONTENT_ADDED,
            data: content
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

// get id content data
const getContents = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;//paragarah get add

        console.log("params", params)
        const dataContent = await DashboardModel.findOne({ _id: id })
        console.log("review", dataContent)
        if (dataContent) {
            return res.status(200).json({
                message: message.GET_CONTENT,
                dataContent
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

//save data - help 
const createHelp = async (req, res) => {
    try {
        const { title, message } = req.body
        const dataHelp = await DashboardModel.create({
            title,
            message
        });
        console.log("dataHelp", dataHelp)
        return res.status(200).json({
            message: message.HELP_ADDED,
            data: dataHelp,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//get help by id
const getHelp = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        //title add 
        console.log("params", params)
        const helpDetails = await DashboardModel.findOne({ _id: id })
        console.log("helpDetails", helpDetails)
        if (helpDetails) {
            return res.status(200).json({
                message: "Help data details.............",
                helpDetails
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
// create section for dashboard
const createSection = async (req, res) => {
    try {
        const { section } = req.body;
        console.log("section..........", section)
        let data = new DashboardModel({
            section,
        });
        console.log("data", data)
        const newData = await data.save();
        if (newData) {
            return res.status(201).json({
                message: message.SECTION_ADDED,
                data: newData
            });
        } else {
            return res.status(404).json({
                message: message.DATA_NOT_FOUND,
            });
        }
    } catch {
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });

    }

};

// get section for dashboard
const getSection = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("parms", params)
        const dataGet = await DashboardModel.findOne({ section: { $elemMatch: { _id: id } } })
        console.log("dataGet", dataGet)
        if (dataGet) {
            return res.status(200).json({
                message: "section details get updated.........",
                dataGet
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
}

//save data - demo section
const createDemo = async (req, res) => {
    try {
        const { demo } = req.body
        const demoDetails = await DashboardModel.create({
            demo
        });
        console.log("demoDetails", demoDetails)
        return res.status(200).json({
            message: message.DEMO_ADDED,
            data: demoDetails,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE,
        });
    }
};

//get id types - demo details
const demoDetails = async (req, res) => {
    try {
        const { params } = req;
        const { id } = params;
        console.log("parms", params)
        const demoData = await DashboardModel.findOne({ demo: { $elemMatch: { id: id } } })
        console.log("demoData", demoData)
        if (demoData) {
            return res.status(200).json({
                message: "Deamo data get details.........",
                demoData
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
module.exports = {
    headerCreate,
    getheader,
    cardCreate,
    getCard,
    createImageIcon,
    getimage,
    createReviews,
    getReviews,
    createContents,
    getContents,
    createHelp,
    getHelp,
    createSection,
    getSection,
    createDemo,
    demoDetails
}