const express = require('express');
const { adminRegister, adminLogin, updateAdminProfile, updateProfileWithPassword, getAdminProfile } = require('../../Controllers/Admin/AdminController');
const { createLocation, getLocation, updateLocation, deleteLocation, getSingleLocation } = require('../../Controllers/Admin/LocationController');

const {adminProtect} = require("../../Middlewares/requireLoginAdmin");
const { getAllPosts, getPostById, deletePost } = require("../../Controllers/Admin/PostMangController");
const { getAllOwner, getSingleOwner, deleteOwner, updateOwnerByAdmin, commentCountByOwner } = require('../../Controllers/Admin/VenderController');
const { createCity, getCity, updateCity, deleteCity, getSingleCity } = require('../../Controllers/Admin/cityController');
const { createPlaces, getPlaces, updatePlaces, deletePlaces, getSinglePlaces } = require('../../Controllers/Admin/PlacesController');
const { createWebsiteSetting, getAllWebsiteSetting } = require('../../Controllers/Admin/websiteController');
const { createManagePages, getAllManagePages } = require('../../Controllers/Admin/ManagePagesController');


const router = express.Router();

router.route('/').post(adminRegister);
router.route('/login').post(adminLogin);
router.route('/profile').post(adminProtect,updateAdminProfile)
router.route('/updateAdminData').patch(adminProtect,updateProfileWithPassword)
router.route('/adminProfile').get(adminProtect,getAdminProfile)
router.route('/country').post(createLocation);
router.route('/country/get').get(getLocation);
router.route('/country/:id').get(adminProtect,getSingleLocation).put(adminProtect,updateLocation).delete(adminProtect,deleteLocation);
router.route('/city').post(createCity);
router.route('/city/get').get(getCity);
router.route('/city/:id').get(adminProtect,getSingleCity).put(adminProtect,updateCity).delete(adminProtect,deleteCity);
router.route('/places').post(createPlaces);
router.route('/places/get').get(getPlaces);
router.route('/places/:id').get(adminProtect,getSinglePlaces).put(adminProtect,updatePlaces).delete(adminProtect,deletePlaces);
router.route('/postmang').get(getAllPosts)
router.route('/postmang/:id').get(adminProtect,getPostById).delete(adminProtect,deletePost)
router.route('/venders').get(getAllOwner)
router.route('/venders/:id').get(adminProtect,getSingleOwner).delete(adminProtect,deleteOwner).put(updateOwnerByAdmin);
router.route('/vender/commentCount').get(commentCountByOwner)

router.route('/website').post(adminProtect,createWebsiteSetting)
router.route('/website').get(getAllWebsiteSetting)

router.route('/managePages').post(adminProtect,createManagePages)
router.route('/managePages').get(getAllManagePages)

module.exports = router