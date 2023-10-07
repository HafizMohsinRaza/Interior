const { OwnerBeforeAfterPost } = require("../Models/OwnerBeforeAfterPostModel");
const { Owner } = require("../Models/OwnerModel");

const createBeforeAfterPost = (req,res) => {
    const {bandfTitle,bandfProjectType,beforePic,afterPic} = req.body;

    try {
        const post = new OwnerBeforeAfterPost({
            bandfTitle,
            bandfProjectType,
            beforePic:beforePic,
            afterPic:afterPic,
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

const getAllPostsBeforeAfter = (req,res) => {
    OwnerBeforeAfterPost.find()
    .populate("postedBy","_id name pic companyName")
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
}

const getPostByOwnerBeforeAfter = async(req,res) => {
    Owner.findOne({_id:req.params.id})
    .then(owner => {
        OwnerBeforeAfterPost.find({postedBy:req.params.id})
        .then(post => {
            res.json({owner,post})
        })
    })
    .catch(err => {
        return res.status(404).json({error:"User Not Found!"})
    })
}

const getOwnerBeforeAfterPost = (req,res) => {
    OwnerBeforeAfterPost.find({postedBy:req.owner._id})
    .then(mypost => {
        res.json({mypost})
    })
    .catch(err => {
        console.log(err)
    })
}

const deleteBeforeAfterByOwner = async(req,res) => {
    const post = await OwnerBeforeAfterPost.findById(req.params.id)
    if(post) {
        await post.deleteOne()
        res.json({message:"Post Removed"})
    }
    else {
        res.status(404);
        res.json({message:"Post is not find"})
    }
}

module.exports = {createBeforeAfterPost,
    getPostByOwnerBeforeAfter,
    getAllPostsBeforeAfter,
    getOwnerBeforeAfterPost,
    deleteBeforeAfterByOwner
}