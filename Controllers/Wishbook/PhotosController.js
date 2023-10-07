const {SavedPhoto} = require('../../Models/Wishbook/PhotosModel');
const {OwnerPost} = require("../../Models/OwnerPostModel")

const savedPhoto = async(req,res) => {
    
    const {pic,companyName,refId} = req.body;

    const post = new SavedPhoto({
        pic:pic,
        companyName:companyName,
        postedBy:req.user,
        refId:refId
    })
    post.save().then(result => {
        res.status(201).send({"msg":"Saved Photos",result})
    })
    .catch(err => {
        console.log(err)
    })
  
}

const checkLikeIconStatus = async (req, res) => {
    const { photoId } = req.body;
    const user = req.user;
    // console.log(user)
  
    try {
      const savedPhoto = await OwnerPost.findOne({
        _id: photoId
      });
  
      if (!savedPhoto) {
        return res.status(404).json({ error: 'Photo not found' });
      }
  
      // Toggle the isLiked property
      savedPhoto.isLiked = !savedPhoto.isLiked;

      if(savedPhoto.isLiked){
        savedPhoto.likedUserDetails = user;
      } else {
        savedPhoto.likedUserDetails = null;
      }
  
      // Save the updated document
      await savedPhoto.save();
  
      res.json({ isSaved: savedPhoto.isLiked });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

const saveToWishbook = async(req,res) => {    //Important
  const { photoId , companyName } = req.body;
  // console.log(photoId)
  const user = req.user; // Assuming you have user information in req

  try {
    // Check if the photo exists in OwnerPost
    const photo = await OwnerPost.findById(photoId);

    // console.log(photo.postedBy.companyName)
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Check if the photo is already saved in the wishbook
    const existingSavedPhoto = await SavedPhoto.findOne({
      refId: photoId,
      postedBy: user._id,
    });
    // console.log(existingSavedPhoto,"sahil")

    if (existingSavedPhoto) {
      // If the photo is already saved, delete it from the wishbook
      await SavedPhoto.deleteOne({ _id: existingSavedPhoto._id }); // Use deleteOne method
      res.json({ isSaved: false });
    } else {
      // If the photo is not saved, add it to the wishbook
      const savedPhoto = new SavedPhoto({
        pic: photo.pics,
        companyName: companyName,
        postedBy: user._id,
        refId: photoId,
      });

      // console.log(savedPhoto)

      await savedPhoto.save();
      res.json({ isSaved: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getUserSavedPhotos = async(req,res) => { //Important
  const userId = req.params.userId; // Assuming you pass the user's ID as a parameter
  try {
    // Query the SavedPhoto model to find all saved photos by the user
    const savedPhotos = await SavedPhoto.find({ postedBy: userId });

    if (!savedPhotos) {
      return res.status(404).json({ error: 'No saved photos found for this user' });
    }

    res.json({ savedPhotos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getSavedPhotosUser = (req,res) => {
    SavedPhoto.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(myphotos => {
        res.json({myphotos})
    })
    .catch(err => {
        console.log(err)
    })
}

const deletePhoto = async(req,res) => {
    const photos = await SavedPhoto.find({ _id: req.params.id });
  // console.log(photos)
  if (photos.length > 0) {
    await SavedPhoto.deleteMany({ _id: req.params.id });
    res.json({ "msg": "Photos Removed!", photos: photos });
  } else {
    res.status(404).json({ msg: "Photos not found!" });
  }
}



module.exports = {savedPhoto,deletePhoto,getSavedPhotosUser,checkLikeIconStatus , saveToWishbook , getUserSavedPhotos}
