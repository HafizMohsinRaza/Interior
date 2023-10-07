const express = require('express');
const {Post} = require('../Models/PostModel')
const {Owner} = require("../Models/OwnerModel")



const createPost = (req,res) => {
    const {description,location,projectCategory,projectIsFor,pic} = req.body;
    
    try {
        const post = new Post({
            description,
            location,
            projectCategory,
            projectIsFor,
            pic:pic,
            postedBy:req.user
        })
        post.save().then(result => {
            res.json({post:result})
        })
        .catch(err => {
            console.log(err)
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const getAllPosts = (req,res) => {
    Post.find()
    .populate("postedBy","_id name role pic")
    .populate("comments.postedBy","_id role name pic state")
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
}

const getUserPost = (req,res) => {
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name pic")
    .populate("comments.postedBy","_id role name")
    .then(mypost => {
        res.json({mypost})
    })
    .catch(err => {
        console.log(err)
    })
}

const getNotification = (req,res) => {
    
}

const getPostById = async(req,res) => {
    const post = await Post.findById(req.params.id)
    .populate("postedBy","_id name role pic")
    .populate("comments.postedBy","_id name role pic city companyName contact createdAt")


    if(post) {
        res.json(post)
    } else {
        res.status(404).json({message:"Post not found"});
    }
    
}

const commentPost = (req,res) => {
    // console.log(req.owner._id)
    const comment = {
        text:req.body.text,
        commentPics:req.body.commentPics,
        postedBy:req.owner._id,
        time:new Date()
    }

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id role name pic city companyName createdAt")
    .populate("postedBy","_id name role")
    // .populate("postedBy","_id role")
    .then(comm => {
        res.json({comm})
    })
    .catch(err => {
        console.log(err)
    })
}

const perOwnerCommentPost = (req,res) => {
    Post.find({'comments.postedBy':req.owner._id})
    .populate('postedBy','_id name pic')
    .then(mypost => {
        res.json({mypost})
    })
    .catch(err => {
        console.log(err)
    })
}

const showPopover = async(req,res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
    
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }
    
        // Check if the authenticated user is the owner of the post
        // You need to implement your own authentication and get the user ID from the request
        // and compare it to the post owner's ID.
        const authenticatedUserId = req.user._id.toString(); // Assuming you have set the user ID in the request during authentication
        const postOwnerId = post.postedBy._id.toString();
        console.log(authenticatedUserId)
        console.log(postOwnerId)
        
        if (authenticatedUserId !== postOwnerId) {
          return res.status(403).json({ error: "Permission denied" });
        }
    
        // If the user owns the post, proceed to show the popover or perform other actions
        // ...
    
        return res.status(200).json({ message: "You can access the popover" });
      } catch (err) {
        return res.status(500).json({ error: "Server error" });
      }
}

module.exports = {createPost,getAllPosts,getPostById,commentPost,getUserPost,perOwnerCommentPost,showPopover}