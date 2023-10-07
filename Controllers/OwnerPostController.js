const express = require('express');
const {OwnerPost} = require('../Models/OwnerPostModel');
const { Owner } = require('../Models/OwnerModel');

const createPost = (req,res) => {
    const {title,projectType,pics} = req.body;

    try {
        const post = new OwnerPost({
            title,
            projectType,
            pics:pics,
            postedBy:req.owner
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

const getAllPostsByPagination = (req,res) => {
    const page = parseInt(req.query.page) || 1; // Current page number, default is 1
  const perPage = 6; // Number of items to show per page

  OwnerPost.find()
    .skip((page - 1) * perPage) // Skip items based on page number
    .limit(perPage) // Limit the number of items per page
    .populate('postedBy', 'companyName') // Replace with actual fields you want to populate
    .populate('likedUserDetails', 'username') // Replace with actual fields you want to populate
    .exec()
    .then((ownerPosts) => {
      res.status(200).json({ ownerPosts });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error fetching owner posts', details: error });
    });
}

const filterGetAllPosts = async(req,res) => {
    try {
        let projectType = req.query.projectType || "All";

        const projectOption = [
            "Kitchen",
            "Bath",
            "Bedroom",
            "Living",
            "Dining",
            "Wardrobe",
            "Baby and Kids",
            "Home Office",
            "Exterior",
            "Bathroom",
            "Garden/Landscape",
            "Corridors",
            "Basement",
            "Furnitures",
            "Home Bar",
            "Restaurant",
            "Office",
            "Salon",
            "Gym and Yoga",
            "Shop"
        ]

        projectType === "All" ? (projectType = [...projectOption]) : (projectType = req.query.projectType.split(","));

        const posts = await OwnerPost.find().populate("postedBy","_id name pic companyName").where("projectType").in([...projectType])

        const response = {
            posts,
            genres:projectOption
        }

        res.status(200).json(response)
    } catch (error) {
        console.log(error);
		res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

const getPostById = async(req,res) => {
    const post = await OwnerPost.findById(req.params.id).populate("postedBy","_id name")

    if(post) {
        res.json(post)
    } else {
        res.status(404).json({message:"Post not found"});
    }
    
}

const getOwnerPostByToken = (req,res) => {
    OwnerPost.find({postedBy:req.owner._id})
    .then(mypost => {
        res.json({mypost})
    })
    .catch(err => {
        console.log(err)
    })
}

const deletePostByOwner = async(req,res) => {
    const post = await OwnerPost.findById(req.params.id);
    if(post) {
        await post.deleteOne()
        res.json({message:"Post Removed",post})
    }
    else {
        res.status(404);
        res.json({message:"Post is not find"})
    }
}

const getPostByOwner = async(req,res) => {
    Owner.findOne({_id:req.params.id})
    .then(owner => {
        OwnerPost.find({postedBy:req.params.id})
        .then(post => {
            res.json({owner,post})
        })
    })
    .catch(err => {
        return res.status(404).json({error:"User Not Found!"})
    })
    
}

const searchOwnerPost = async(req,res) => {
    const { companyName } = req.query;

    try {
        // Search for owner posts with matching companyName
        const ownerPosts = await OwnerPost.find({}).populate({
        path: 'postedBy',
        match: { companyName: { $regex: companyName, $options: 'i' } }
        }).exec();

        // Filter out posts with null or empty postedBy field
        const filteredPosts = ownerPosts.filter(post => post.postedBy);

        res.json(filteredPosts);
    } catch (error) {
        console.error('Error searching owner posts:', error);
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = {createPost,
    getAllPostsByPagination,
    getPostById,
    getPostByOwner,
    filterGetAllPosts,
    searchOwnerPost,
    getOwnerPostByToken,
    deletePostByOwner
}