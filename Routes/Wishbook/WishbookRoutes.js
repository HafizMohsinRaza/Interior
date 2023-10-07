const express = require('express');
const { savedPhoto, deletePhoto, getSavedPhotosUser, checkLikeIconStatus, saveToWishbook, getUserSavedPhotos } = require('../../Controllers/Wishbook/PhotosController');
const { savedFreelancer, deleteFreelancer, getSavedFreelancer , countSavedByUsersFreelancer, saveFreelancerToWishbook, getUserSavedFreelancer } = require('../../Controllers/Wishbook/FreelancerController');
const { savedProfessional, deleteProfessional, getSavedProf, countSavedByUsers, saveProfessionalToWishbook, getUserSavedProfessional } = require('../../Controllers/Wishbook/ProfessionalController');
const { protect } = require('../../Middlewares/requireLogin');

const router = express.Router();

router.route('/photo').post(protect,savedPhoto);
router.route('/getphotos').get(protect,getSavedPhotosUser);
router.route('/photo/:id').delete(protect,deletePhoto);
router.route('/freelancer').post(protect,savedFreelancer);
router.route('/freelancer/:id').delete(protect,deleteFreelancer);
router.route('/freelancer/:freelancerId/countSaved').get(countSavedByUsersFreelancer)
router.route('/getfreelancer').get(protect,getSavedFreelancer);
router.route('/professional').post(protect,savedProfessional);
router.route('/professional/:id').delete(protect,deleteProfessional);
router.route('/professional/:professionalId/countSaved').get(countSavedByUsers)
router.route('/getprof').get(protect,getSavedProf);

router.route('/checkSavedStatus').post(protect,checkLikeIconStatus);
router.route('/checkSavedStatuses').post(protect,saveToWishbook); //important
router.route('/:userId').get(getUserSavedPhotos) //important

router.route('/checkSavedProfessional').post(protect,saveProfessionalToWishbook)
router.route('/savedProf/:userId').get(getUserSavedProfessional);

router.route('/checkSavedFreelancer').post(protect,saveFreelancerToWishbook);
router.route('/savedFree/:userId').get(getUserSavedFreelancer);

module.exports = router