const { Owner } = require("../../Models/OwnerModel");
const {
  OwnerSavedFreeelancer,
} = require("../../Models/OwnerWishbook/OwnerFreelancerModel");

const savedOwnerFreelancer = async (req, res) => {
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

  const data = new OwnerSavedFreeelancer({
    name,
    email,
    pic,
    companyName,
    address,
    city,
    country,
    rating,
    reviews,
    postedBy: req.owner,
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
};

const getOwnerSavedFreelancer = (req, res) => {
  OwnerSavedFreeelancer.find({ postedBy: req.owner._id })
    .populate("postedBy", "_id name")
    .then((myfreelancer) => {
      res.json({ myfreelancer });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteOwnerFreelancer = async (req, res) => {
  const freelancer = await OwnerSavedFreeelancer.find({ refId: req.params.id });

  if (freelancer.length > 0) {
    await OwnerSavedFreeelancer.deleteMany({ refId: req.params.id });
    res.json({ msg: "Freelancer Removed!", freelancer: freelancer });
  } else {
    res.status(404).json({ msg: "Freelancer not found!" });
  }
};

const countSavedByOwnerFreelancer = async (req, res) => {
  const freelancerId = req.params.freelancerId;

  try {
    const savedCount = await OwnerSavedFreeelancer.countDocuments({
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

  const owner = req.owner;

  try {
    const freelancer = await Owner.findById(freeId);

    if(!freelancer){
      return res.status(404).json({ error: 'Freelancer not found' });
    }

    const existingFreelancer = await OwnerSavedFreeelancer.findOne({
      refId:freeId,
      postedBy:owner._id
    })

    if(existingFreelancer){
      await OwnerSavedFreeelancer.deleteOne({_id:existingFreelancer._id});
      res.json({isSaved:false})
    } else {
      const savedFreelancer = new OwnerSavedFreeelancer({
                name:freelancer.name,
                email:freelancer.email,
                pic:freelancer.pic,
                companyName:freelancer.companyName,
                address:freelancer.address,
                city:freelancer.city,
                country:freelancer.country,
                contact:freelancer.contact,
                reviews:freelancer.reviews,
                postedBy:owner._id,
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

const getOwnerSavedFreel = async(req,res) => {
  const ownerId = req.params.ownerId;

  try {
    const savedFreelancer = await OwnerSavedFreeelancer.find({postedBy:ownerId});

    if(!savedFreelancer){
      return res.status(404).json({ error: 'No saved freelancer found for this owner' });
    }
    res.json({savedFreelancer})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  savedOwnerFreelancer,
  getOwnerSavedFreelancer,
  deleteOwnerFreelancer,
  countSavedByOwnerFreelancer,
  saveFreelancerToWishbook,
  getOwnerSavedFreel
};
