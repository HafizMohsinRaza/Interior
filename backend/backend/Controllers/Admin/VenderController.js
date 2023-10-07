const {Owner} = require('../../Models/OwnerModel');
const {Post} = require('../../Models/PostModel')

const getAllOwner = async(req,res) => {
    const AllOwner = await Owner.find()
    res.json(AllOwner)
}

const getSingleOwner = (req,res) => {
    Owner.findOne({_id:req.params.id})
    .then(owner => {
      if (owner) {
          const ownerWithPassword = owner.toObject();
          res.json(ownerWithPassword);
      } else {
          return res.status(404).json({error:"Owner Not Found!"});
      }
    })
    .catch(err => {
        return res.status(500).json({error: "Server error"});
    });
}

const updateOwnerByAdmin = async(req,res) => {
    const {name,email,pic,companyName,category,companyFilter,contact,address,city,state,country,pincode,aboutUs,services
    ,achievements,profInfo,websiteLink,facebookLink,instagramLink,youtubeLink} = req.body

    const owner = await Owner.findById(req.params.id);

    if(owner) {
        owner.name = name;
        owner.email = email;
        owner.pic = pic;
        owner.companyName = companyName;
        owner.category = category;
        owner.companyFilter = companyFilter;
        owner.contact = contact;
        owner.address = address;
        owner.city = city;
        owner.state = state;
        owner.country = country;
        owner.pincode = pincode;
        owner.aboutUs = aboutUs;
        owner.services = services;
        owner.achievements = achievements;
        owner.profInfo = profInfo;
        owner.websiteLink = websiteLink;
        owner.facebookLink = facebookLink;
        owner.instagramLink = instagramLink;
        owner.youtubeLink = youtubeLink;

        const updatedOwner = await owner.save()
        res.json(updatedOwner)
    }else{
        res.status(404);
        throw new Error("Owner not found")
    }
}

const deleteOwner = async(req,res) => {
    const owner = await Owner.findById(req.params.id);
    // console.log(location)
    if(owner) {
        await owner.deleteOne();
        res.json({message:"Owner Removed"})
    } else {
        res.status(404);
        throw new Error("Owner not found")
    }
}

const commentCountByOwner = async(req,res) => {
    try {
        const allOwners = await Owner.find();
    
        const ownerIds = allOwners.map((owner) => owner._id);
    
        const commentsCountByOwner = await Post.aggregate([
          {
            $unwind: '$comments',
          },
          {
            $group: {
              _id: '$comments.postedBy',
              commentCount: { $sum: 1 },
            },
          },
          {
            $match: {
              _id: { $in: ownerIds },
            },
          },
        ]);
    
        const ownersWithCommentCount = allOwners.map((owner) => {
          const commentCountObj = commentsCountByOwner.find(
            (item) => item._id.toString() === owner._id.toString()
          );
    
          return {
            _id: owner._id,
            name: owner.name,
            email: owner.email,
            role: owner.role, // Show the 'role' field directly
            commentCount: commentCountObj ? commentCountObj.commentCount : 0,
          };
        });
    
        res.status(200).json(ownersWithCommentCount);
      } catch (error) {
        res.status(500).json({ error: 'Error while fetching owners and comment count' });
      }
}

module.exports = {getAllOwner,getSingleOwner,deleteOwner,updateOwnerByAdmin,commentCountByOwner}