const express = require('express');
const { ownerRegister, ownerLogin, updateOwner, getAllOwner, subOwnerPost, reviewPost, getOwnerById, forgotPasswordOnwer, validOwner, ownerChangePassword, ownerOtpSend, contactButtonClickCount, getContactButtonClickCount } = require("../Controllers/OwnerController");
const {protect2} = require("../Middlewares/requireLoginOwner")
const {protect} = require('../Middlewares/requireLogin');


const router = express.Router();

router.route('/').post(ownerRegister);
router.route('/otpSend').post(ownerOtpSend);
router.route('/login').post(ownerLogin);
router.route('/profile').post(protect2,updateOwner);
router.route('/allOwner').get(getAllOwner)
router.route('/getownerbyid/:id').get(getOwnerById)
router.route('/profile/:id').get(subOwnerPost);
router.route('/review').put(protect,reviewPost);
router.route('/sendpasswordlinkowner').post(forgotPasswordOnwer);
router.route('/ownerforgotpassword/:id/:token').get(validOwner);
router.route('/:id/:token').post(ownerChangePassword);
router.route('/:ownerId/click').put(contactButtonClickCount);
router.route('/:ownerId').get(getContactButtonClickCount);

module.exports = router