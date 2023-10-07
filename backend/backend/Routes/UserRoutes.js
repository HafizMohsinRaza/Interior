const express = require('express');
const {userRegister, userLogin, updateUserProfile, getUserProfile, forgotPassword, forgotPassword2, validUser, changePassword, userOtpSend, loginWithSocialMedia} = require("../Controllers/UserController");
const { protect } = require('../Middlewares/requireLogin');



const router = express.Router();

router.route('/').post(userRegister);
router.route('/otpSend').post(userOtpSend);
router.route('/login').post(userLogin);
router.route('/profile').post(protect,updateUserProfile);
router.route('/getprofile').get(protect,getUserProfile);
router.route('/sendpasswordlink').post(forgotPassword2);
router.route("/forgotpassword/:id/:token").get(validUser);
router.route("/:id/:token").post(changePassword)
router.route('/social').post(loginWithSocialMedia)

module.exports = router