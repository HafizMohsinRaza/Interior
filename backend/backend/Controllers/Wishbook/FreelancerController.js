const { Owner } = require("../../Models/OwnerModel");
const { SavedFreelancer } = require("../../Models/Wishbook/FreelancersModel");

const savedFreelancer = async (req, res) => {
  const {
    name,
    email,
    pic,
    companyName,
    address,
    city,
    country,
    rating,
    reviews,
    refId,
  } = req.body;

  const data = new SavedFreelancer({
    name,
    email,
    pic,
    companyName,
    address,
    city,
    country,
    rating,
    reviews,
    postedBy: req.user,
    refId: refId,
  });
  data
    .save()
    .then((result) => {
      res.status(201).send({ msg: "Saved Freelancer!", result });
    })
    .catch((err) => {
      console.log(err);
    });

  // try {
  //     const alreadyPresent = await SavedFreelancer.findOne({companyName})

  //     if(alreadyPresent)
  //     {
  //         return res.status(403).send({"msg":"This are already saved in your wishbook!"})
  //     }
  //     else{

  //     }

  // } catch (error) {
  //     res.status(500).send(error);
  // }
};

const getSavedFreelancer = (req, res) => {
  SavedFreelancer.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myfreelancer) => {
      res.json({ myfreelancer });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteFreelancer = async (req, res) => {
  const freelancer = await SavedFreelancer.find({ refId: req.params.id });
  // console.log(location)
  if (freelancer.length > 0) {
    await SavedFreelancer.deleteMany({ refId: req.params.id });
    res.json({ msg: "Freelancer Removed!", freelancer: freelancer });
  } else {
    res.status(404).json({ msg: "Freelancer not found!" });
  }
};

const countSavedByUsersFreelancer = async (req, res) => {
  const freelancerId = req.params.freelancerId;

  try {
    const savedCount = await SavedFreelancer.countDocuments({
      refId: freelancerId,
    });

    res.status(200).json({ count: savedCount });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while counting saved profiles." });
  }
};

const saveFreelancerToWishbook = async(req,res) => {
  const {freeId} = req.body;

  const user = req.user;

  try {
    const freelancer = await Owner.findById(freeId);

    if(!freelancer){
      return res.status(404).json({ error: 'Freelancer not found' });
    }

    const existingFreelancer = await SavedFreelancer.findOne({
      refId:freeId,
      postedBy:user._id
    })

    if(existingFreelancer){
      await SavedFreelancer.deleteOne({_id:existingFreelancer._id})
      res.json({isSaved:false})
    } else {
      const savedFreelancer = new SavedFreelancer({
                name:freelancer.name,
                email:freelancer.email,
                pic:freelancer.pic,
                companyName:freelancer.companyName,
                address:freelancer.address,
                city:freelancer.city,
                country:freelancer.country,
                contact:freelancer.contact,
                reviews:freelancer.reviews,
                postedBy:user._id,
                refId:freeId
      })

      await savedFreelancer.save()
      res.json({isSaved:true})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getUserSavedFreelancer = async(req,res) => {
  const userId = req.params.userId;
  try {
    const savedFreelancer = await SavedFreelancer.find({postedBy:userId});

    if(!savedFreelancer){
      return res.status(404).json({ error: 'No saved freelancer found for this user' });
    }
    res.json({savedFreelancer})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = {
  savedFreelancer,
  deleteFreelancer,
  getSavedFreelancer,
  countSavedByUsersFreelancer,
  saveFreelancerToWishbook,
  getUserSavedFreelancer
};
