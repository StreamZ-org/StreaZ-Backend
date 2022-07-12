const User = require('../models/UserModel');

module.exports.register = async (req, res, next) => {
    try {
        const {mob,email,username, profilePicture, isEmailVerified, userId} = req.body;
        if(mob == undefined){
            return res.status(500).json({
                success: false,
                errorCode: 541,
                message: "Enter a valid Mobile Number"
            });
        }
        
        if(mob.length !== 10){
            return res.status(500).json("Enter a valid 10 digit mob no.")
        }
        if(email == undefined){
            return res.status(500).json({
                success: false,
                errorCode: 542,
                message: "Enter a valid Email ID"
            });
        }
        if(isEmailVerified == undefined){
            return res.status(500).json({
                success: false,
                errorCode: 544,
                message: "Enter isEmailVerified Status"
            });
        }
        if(username == undefined){
            return res.status(500).json({
                success: false,
                errorCode: 545,
                message: "Enter valid Username"
            });
        }
        if(userId == undefined){
            return res.status(500).json({
                success: false,
                errorCode: 546,
                message: "Enter User ID"
            });
        }
        
        var user = await User.findOne({mob: mob});
        if(user){
            return res.status(500).json({
                "success": false,
                errorCode: 441,
                "message": "Account already exist with this Mobile number. Please try to LogIn"
            })
        }

        user = await User.findOne({email: email});
        if(user){
            return res.status(500).json({
                "success": false,
                errorCode: 442,
                "message": "Account already exist with this Email ID. Please try to LogIn"
            });
        }

        try {
            var savedUser = await new User({
                userId: userId,
                mob: mob,
                email: email,
                isEmailVerified: isEmailVerified,
                username: username,
                profilePicture: profilePicture ?  profilePicture : null
            }).save();
            if(savedUser){
                return res.status(200).json(savedUser);
            }
            return res.status(500).json({
                errorCode: 505
            })
        } catch (error) {
            return res.status(500).json({
                errorCode: 500,
                error: error
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

module.exports.getUserDetails = async(req, res, next) => {
    try {
        var phone_number = req.body.phone_number;
        if(phone_number.length != 10){
            return res.json({
                success: false,
                errorCode: 431,
                message: "Please Send the correct Pnone Number without +91"
            });
        }

        const user = await User.findOne({mob:phone_number});
        if(user){
            return res.status(200).json({
                user
            });
        }
        
        return res.json({
            signUpRequired: true,
            errorCode: 231
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}