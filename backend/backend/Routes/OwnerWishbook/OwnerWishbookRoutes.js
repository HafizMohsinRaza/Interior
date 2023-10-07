const express = require('express');
const {protect2} = require("../../Middlewares/requireLoginOwner");
const { savedPhotoOwner, getSavedPhototsOwner, deletePhotoOwner, savedToOwnerWishbook, getOwnerSavedPhoto } = require('../../Controllers/OwnerWishbook/OwnerPhotosController');
const { savedOwnerProfessional, deleteOwnerProfessional, getOwnerSavedProf, countSavedByOwner, getOwnerSavedProfessional, saveProfessionalToWishbook } = require("../../Controllers/OwnerWishbook/OwnerProfessionalController")
const { savedOwnerFreelancer, deleteOwnerFreelancer, getOwnerSavedFreelancer, countSavedByOwnerFreelancer, saveFreelancerToWishbook, getOwnerSavedFreel } = require("../../Controllers/OwnerWishbook/OwnerFreelancerController");


const router = express.Router();

router.route('/photo').post(protect2,savedPhotoOwner);
router.route('/getphotos').get(protect2,getSavedPhototsOwner);
router.route('/photo/:id').delete(protect2,deletePhotoOwner);
router.route('/freelancer').post(protect2,savedOwnerFreelancer);
router.route('/freelancer/:id').delete(protect2,deleteOwnerFreelancer);
router.route('/freelancer/:freelancerId/countSaved').get(countSavedByOwnerFreelancer)
router.route('/getfreelancer').get(protect2,getOwnerSavedFreelancer);
router.route('/professional').post(protect2,savedOwnerProfessional);
router.route('/professional/:id').delete(protect2,deleteOwnerProfessional);
router.route('/professional/:professionalId/countSaved').get(countSavedByOwner);
router.route('/getProf').get(protect2,getOwnerSavedProf);

router.route('/checkSavedStatuses').post(protect2,savedToOwnerWishbook);
router.route('/:ownerId').get(getOwnerSavedPhoto);

router.route('/checkOwnerSavedProf').post(protect2,saveProfessionalToWishbook);
router.route('/savedProf/:ownerId').get(getOwnerSavedProfessional)

router.route('/checkOwnerSavedFree').post(protect2,saveFreelancerToWishbook);
router.route('/savedFree/:ownerId').get(getOwnerSavedFreel);

module.exports = router