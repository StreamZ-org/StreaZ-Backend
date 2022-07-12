const fbAdmin = require('../config/firebaseOTPVerify/firebaseOtpVerifyConfig');
const User = require('../models/UserModel');

module.exports.verifyFBTokenMiddleWare = async(req,res,next) => {
    try {
        var token = req.headers.authorization.split(' ')[1];
        const decodeValue = await fbAdmin.auth().verifyIdToken(token);
        if (decodeValue) {
            return next();
        }
        return res.json({ 
            message: 'Un authorize', 
            errorCode: 527,
        });
    } catch (e) {
        if(e.codePrefix === 'auth'){
            return res.json({ 
                message: 'Internal Error' ,
                errorCode: 427,
                codePrefix: e.codePrefix
            });
        }
        console.log("Error without Auth : ",e);
        return res.json({ 
            message: 'Internal Error' ,
            error: e,
            errorCode: 500
        });
    }
}

module.exports.verifyAdminFBTokenMiddleWare = async(req,res,next) => {
    try {
        var token = req.headers.authorization.split(' ')[1];
        const decodeValue = await fbAdmin.auth().verifyIdToken(token);
        if (decodeValue) {
            var mob = decodeValue.phone_number.substring(3);
            var user = await User.findOne({mob: mob});
            if(!user){
                return res.status(481).json({
                    success: false,
                    phone_number: decodeValue.phone_number,
                    message: 'User with Mobile Number not found.'
                });
            }
            if(user.isAdmin){
                return next();
            }
            return res.status(482).json({
                success: false,
                phone_number: decodeValue.phone_number,
                message: "Only ADMIN can access the route"
            });
        }
        return res.json({ 
            message: 'Un authorize', 
            errorCode: 527,
        });
    } catch (e) {
        if(e.codePrefix === 'auth'){
            return res.json({ 
                message: 'Internal Error' ,
                errorCode: 427,
                codePrefix: e.codePrefix
            });
        }
        console.log("Error without Auth : ",e);
        return res.json({ 
            message: 'Internal Error' ,
            error: e,
            errorCode: 500
        });
    }
}