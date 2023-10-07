const express = require('express');
const { createPost, getAllPosts,commentPost, getPostById, getUserPost, perOwnerCommentPost, showPopover } = require('../Controllers/PostController');
const {protect} = require("../Middlewares/requireLogin");
const {protect2} = require("../Middlewares/requireLoginOwner");
const { checkPostOwnership } = require('../Middlewares/checkPostOwnership');

const router = express.Router();

router.route('/').post(protect,createPost);
router.route('/get').get(getAllPosts);
router.route('/get/:id').get(getPostById);
router.route('/comment').put(protect2,commentPost)
router.route('/userpost').get(protect,getUserPost);

router.route('/ownerCommentPosts').get(protect2,perOwnerCommentPost);

// router.route('/:postId' ,protect, checkPostOwnership,showPopover);
router.route('/:postId/popover').get(protect,showPopover)

module.exports = router