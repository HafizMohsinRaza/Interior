const { OwnerPost } = require("../../Models/OwnerPostModel");
const {OwnerSavedPhoto} = require("../../Models/OwnerWishbook/OwnerPhotosModel");
const {ObjectId} = require('mongoose').Types;
const mongoose = require("mongoose")

const savedPhotoOwner = async(req,res) => {
    const {pic,companyName,refId} = req.body;

    const post = new OwnerSavedPhoto({
        pic:pic,
        companyName:companyName,
        postedBy:req.owner,
        refId:refId
    })
    post.save().then(result => {
        res.status(201).send({"msg":"Saved Photos",result})
    })
    .catch(err => {
        console.log(err)
    })
}

const getSavedPhototsOwner = (req,res) => {
    OwnerSavedPhoto.find({postedBy:req.owner._id})
    .populate("postedBy","_id name")
    .then(myphotos => {
        res.json({myphotos})
    })
    .catch(err => {
        console.log(err)
    })
}

const deletePhotoOwner = async(req,res) => {
    const photos = await OwnerSavedPhoto.find({ _id: req.params.id });

    if(photos.length > 0) {
        await OwnerSavedPhoto.deleteMany({ _id: req.params.id })
        res.json({ "msg": "Photos Removed!", photos: photos });
    } else {
        res.status(404).json({ msg: "Photos not found!" });
    }
}

const savedToOwnerWishbook = async(req,res) => {
    const { photoId , companyName} = req.body;
    // console.log(photoId)
    const owner = req.owner

    try {
        const photo = await OwnerPost.findById(photoId);

        if(!photo) {
            return res.status(404).json({ error: 'Photo not found' });
        }

        const existingSavedPhoto = await OwnerSavedPhoto.findOne({
            refId:photoId,
            postedBy:owner._id
        });

        if(existingSavedPhoto) {
            await OwnerSavedPhoto.deleteOne({ _id:existingSavedPhoto._id})
            res.json({isSaved:false})
        } else {
            const savedPhoto = new OwnerSavedPhoto({
                pic:photo.pics,
                companyName:companyName,
                postedBy:owner._id,
                refId:photoId
            });

            await savedPhoto.save();
            res.json({isSaved:true});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getOwnerSavedPhoto = async(req,res) => {
    const ownerId = req.params.ownerId;

    try {
        const savedPhotos = await OwnerSavedPhoto.find({postedBy:ownerId});
        if(!savedPhotos){
            return res.status(404).json({ error: 'No saved photos found for this user' });
        }

        res.json({ savedPhotos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {savedPhotoOwner,
    getSavedPhototsOwner,
    deletePhotoOwner,
    savedToOwnerWishbook,
getOwnerSavedPhoto}