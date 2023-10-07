const {Post} = require("../../Models/PostModel");

const getAllPosts = (req,res) => {
    Post.find()
    .populate("postedBy","_id name role")
    .populate("comments.postedBy","_id role name pic")
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
}

const getPostById = async(req,res) => {
    const post = await Post.findById(req.params.id)
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")


    if(post) {
        res.json(post)
    } else {
        res.status(404).json({message:"Post not found"});
    }
    
}

const deletePost = async(req,res) => {
    const post = await Post.findById(req.params.id);
    // console.log(location)
    if(post) {
        await post.deleteOne();
        res.json({message:"Post Removed"})
    } else {
        res.status(404);
        res.json({message:"Post is not find"})
    }
}

module.exports = {getAllPosts,getPostById,deletePost}