const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const ownerBeforeAfterSchema = new mongoose.Schema({
    bandfTitle:{
        type:String
    },
    bandfProjectType:{
        type:String
    },
    beforePic:{
        type:String
    },
    afterPic:{
        type:String
    },
    postedBy:{
        type:ObjectId,
        ref:"Owner"
    }
},{
    timestamps:true
})

const OwnerBeforeAfterPost = mongoose.model("OwnerBeforeAfterPost",ownerBeforeAfterSchema)

module.exports = {OwnerBeforeAfterPost}