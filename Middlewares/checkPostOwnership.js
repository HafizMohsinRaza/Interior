const {Post} = require("../Models/PostModel")

const checkPostOwnership = async(req,res,next) => {
    try {
        const postId = req.params.postId; // Assuming postId is part of the request params
        const post = await Post.findById(postId);
        if (!post) {
        return res.status(404).json({ error: "Post not found" });
        }

        if (post.postedBy.toString() !== req.user._id.toString()) {
        // req.user._id is the user ID extracted from the JWT token
        return res.status(403).json({ error: "Unauthorized access" });
        }

        // If the user owns the post, proceed to the next middleware or controller function
        next();
    } catch (error) {
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = {checkPostOwnership}