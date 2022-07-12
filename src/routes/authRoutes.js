const router = require('express').Router();
const fbTokenMiddleware = require('../middlewares/verifyFBToken');
const authController = require('../controllers/authController');


router.route('/verifyFBToken')
    .all(fbTokenMiddleware.verifyFBTokenMiddleWare)
    .get((req,res)=>{
        res.json("verifyFBToken GET Request");
    })
    .post((req,res,next)=>{
        res.json("verifyFBToken POST Request");
    });
router.route('/verifyAdminFBToken')
    .all(fbTokenMiddleware.verifyAdminFBTokenMiddleWare)
    .get((req,res)=>{
        res.json("verifyAdminFBToken GET Request");
    })
    .post((req,res,next)=>{
        res.json("verifyAdminFBToken POST Request");
    });

router.route('/signup')
    .all(fbTokenMiddleware.verifyFBTokenMiddleWare)
    .get((req,res)=>{
        return res.json("SignUp Page GET Request");
    })
    .post(async (req,res,next)=>{
        authController.register(req,res,next);
    })

router.route('/getUserDetails')
    .all(fbTokenMiddleware.verifyFBTokenMiddleWare)
    .get((req,res,next)=>{
        return res.status(200).json('getUserDetails GET Request');
    })
    .post(async (req,res,next)=>{
        authController.getUserDetails(req,res,next);
    });
module.exports = router;