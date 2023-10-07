const express = require('express');
const { createPost, getPostById, getPostByOwner, filterGetAllPosts, searchOwnerPost, getOwnerPostByToken, deletePostByOwner, getAllPostsByPagination } = require('../Controllers/OwnerPostController');
const {protect2} = require("../Middlewares/requireLoginOwner");
const { createBeforeAfterPost, getPostByOwnerBeforeAfter, getAllPostsBeforeAfter, getOwnerBeforeAfterPost, deleteBeforeAfterByOwner } = require('../Controllers/OwnerBeforeAfterPostController');

const router = express.Router();

router.route('/').post(protect2,createPost);
router.route('/get').get(getAllPostsByPagination);
router.route('/get/:id').get(getPostById);
router.route('/getPostOwner/:id').get(getPostByOwner); //used
router.route('/getPost').get(filterGetAllPosts); //used
router.route('/search').get(searchOwnerPost);
router.route('/getAllOwnerPost').get(protect2,getOwnerPostByToken);
router.route('/deleteOwnerPost/:id').delete(protect2,deletePostByOwner)

//before and after post
router.route('/beforeAfterPost').post(protect2,createBeforeAfterPost);
router.route('/getPostOwnerBeforeAfter/:id').get(getPostByOwnerBeforeAfter);
router.route('/getAllBeforeAfter').get(getAllPostsBeforeAfter);
router.route('/getAllOwnerBeforeAfterPost').get(protect2,getOwnerBeforeAfterPost)
router.route('/deleteBeforeAfterOwnerPost/:id').delete(protect2,deleteBeforeAfterByOwner)

module.exports = router