const { message } = require("../common/Message")
const bcrypt = require("bcrypt")
//const jwt = require("jsonwebtoken")
const { genrateToken } = require("../common/token");
const { hashSync } = require("bcrypt");
const AuthModelSchema = require("../model/AuthModelSchema")
const Joi = require("joi");


async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}
var baseUrl = "http://192.168.0.150:8000/public/"


//user login
// const userLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log("req.body", req.body)
//         const user = await UserModelSchema.findOne({ email });
//         if (!user) {
//             return res.status(404).json({
//                 message: message.DATA_NOT_FOUND
//             })
//         }
//         const isPasswordCheck = await bcrypt.compare(password, user.password);
//         if (!isPasswordCheck) {
//             return res.status(422).json({
//                 message: message.PASSWORD_NOT_MATCH
//             });
//         }
//         const token = jwt.sign({ email: email },
//             process.env.JWT_SECRET,
//             {
//                 expiresIn: "1h",
//             });
//         return res.status(200).json({
//             message: message.USER_LOGIN,
//             data: token
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: message.ERROR_MESSAGE
//         });
//     }
// }


//update user profile 
const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { file } = req;
        // console.log("file",req)
        const { firstName, lastName, image } = req.body
        console.log("req.body", req.body)
        // image: file.filename,

        const user = await AuthModelSchema.findOne({ id })
        if (!user == user.id) {
            return res.send("Invalid User Id...")
        }
        await user.save();
        console.log("user!!!!!!!!!!!!!!!!!!!", user)
        const updateUser = await AuthModelSchema.findOneAndUpdate({ _id: id },
            { $set: { firstName: firstName, lastName: lastName, image: baseUrl + file.filename } }, { new: true })
        console.log("updateUser.........", updateUser) 
        return res.status(200).json({
            message: message.USER_PROFILE_UPDATE,
            updateUser
        })
    } catch (error) {
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        });
    }
}

//user login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("req.body", req.body)
        const schema = await Joi.object({
            email: Joi.string().email().required().messages({
                "string.empty": `email is a required field.`,
                "string.email": `please enter valid email.`
            }),
            password: Joi.string().min(8).max(16).required().messages({
                "string.empty": `Password is a required field.`,
                "string.min": `Password must be at least 8 characters long.`,
                "string.max": `Password must be at least 16 characters short.`
            })
        });
        const validation = schema.validate({
            email: email,
            password: password,
        });
        console.log("validation", validation);

        if (validation.error) {
            return res.status(422).send({
                status: 422,
                message: validation.error.details,
            });
        }
        const adminDetail = await AuthModelSchema.findOne({ email });
        if (!adminDetail) {
            return res.status(409).json({
                status: 409,
                message: message.EMAIL_PASSWORD_WRONG,
            })
        }
        const isPasswordCheck = await bcrypt.compare(password, adminDetail.password);
        if (!isPasswordCheck) {
            return res.status(422).json({
                status: 422,
                message: message.PASSWORD_NOT_MATCH
            });
        }
        const token = await genrateToken({
            id: adminDetail
        });

        res.cookie("adminSession", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        return res.status(200).json({
            status: 200,
            message: message.USER_LOGIN,
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: message.ERROR_MESSAGE
        });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("adminSession");
        return res.status(200).json({
            status: 200,
            message: message.USER_LOGOUT,
        });
    } catch {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        });
    }
}

//update password
const updatePassword = async (req, res) => {
    var _id = req.body._id;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    const hashedPassword = await hashPassword(password, confirm_password);

    if (!password) {
        return res.status(402).json({
            message: message.PASSWORD_INCORRECT,
        });
    }
    if (!confirm_password) {
        return res.status(401).json({
            message: message.CONFIRM_PASSWORD 
        });
    }
    if (password != confirm_password) {
        return res.status(403).json({
            message: message.PASSWORD_CHECKED,
        });
    }
    var data = await AuthModelSchema.findOneAndUpdate(
        { _id: _id },
        { $set: { password: hashedPassword, confirm_password: hashedPassword } }
    );
    if (!data) {
        return res.status(400).json({
            message: message.PASSWORD_NOT_UPDATED,
        });
    } else {
        return res.status(200).json({
            message: message.PASSWORD_UPDATED,
        });
    }
};

//change password
const changePassword = async (req, res) => {
    var _id = req.body._id;
    // console.log("userId",userId)
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;
    var confirmPassword = req.body.confirmPassword

    if (newPassword != confirmPassword) {
        return res.status(403).json({
            message: message.PASSWORD_CHECKED,
        });
    }
    var data = await AuthModelSchema.findOne({ _id: _id });
    console.log("data", data);

    const validOldPassword = await validatePassword(oldPassword, data.password);
    if (!validOldPassword)
        return res.status(402).json({
            message: "plz check passwords",
        });

    const hashedPassword = await hashPassword(newPassword);

    var result = await AuthModelSchema.findOneAndUpdate(
        { _id: _id },
        { $set: { password: hashedPassword, confirmpassword: newPassword } }
    );
    if (!result) {
        return res.json({ statusCode: 400, statusMsj: message.BAD_REQUEST });
    } else {
        return res.json({
            statusCode: 200,
            statusMsj: "password change successfully",
        });
    }
};
const getData = async (req, res) => {
    try {
        let result = await AuthModelSchema.find().select("-password");
        console.log("result....................", result)
        res.status(200).json({
            success: true,
            message: "Admin Details",
            data: result
        });

    } catch {
        console.log(error);
        return res.status(500).json({
            message: message.ERROR_MESSAGE
        });
    }

}
module.exports = {
    adminLogin,
    updateUserProfile,
    logout,
    updatePassword,
    changePassword,
    getData

}