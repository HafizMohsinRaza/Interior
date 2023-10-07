const { Owner } = require("../../Models/OwnerModel");
const { OwnerSavedProfessional } = require("../../Models/OwnerWishbook/OnwerProfessionalModel");

const savedOwnerProfessional = async(req,res) => {
    const {name,email,pic,companyName,address,city,country,rating,contact,reviews,refId} = req.body;

    const data = new OwnerSavedProfessional({
        name,
        email,
        pic,
        companyName,
        address,
        city,
        country,
        rating,
        contact,
        reviews,
        postedBy:req.owner,
        refId:refId
    })
    data.save().then(result => {
        res.status(201).send({"msg":"Saved Professional!",result})
    })
    .catch(err => {
        console.log(err)
    })
}

const getOwnerSavedProf = (req,res) => {
    OwnerSavedProfessional.find({postedBy:req.owner._id})
    .populate("postedBy","_id name")
    .then(myprof => {
        res.json({myprof})
    })
    .catch(err => {
        console.log(err)
    })
}

const deleteOwnerProfessional = async(req,res) => {
    const professional = await OwnerSavedProfessional.find({ refId: req.params.id })

    if(professional.length > 0) {
        await OwnerSavedProfessional.deleteMany({ refId: req.params.id })
        res.json({ "msg": "Professional Removed!", professional:professional });
    }
    else {
        res.status(404).json({ msg: "Professional not found!" });
    }
}

const countSavedByOwner = async(req,res) => {
    const professionalId = req.params.professionalId;

    try {
        const savedCount = await OwnerSavedProfessional.countDocuments({
            refId:professionalId
        })
        res.status(200).json({ count: savedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while counting saved profiles.' });
    }
}

const saveProfessionalToWishbook = async(req,res) => {
    const {profId} = req.body;

    const owner = req.owner;

    try {
        const professional = await Owner.findById(profId);

        if(!professional){
            return res.status(404).json({ error: 'Professional not found' });
        }

        const existingProfessional = await OwnerSavedProfessional.findOne({
            refId:profId,
            postedBy:owner._id
        })

        if(existingProfessional){
            await OwnerSavedProfessional.deleteOne({_id:existingProfessional._id})
            res.json({isSaved:false})
        } else {
            const savedOwnerProfessional = new OwnerSavedProfessional({
                name:professional.name,
                email:professional.email,
                pic:professional.pic,
                companyName:professional.companyName,
                address:professional.address,
                city:professional.city,
                country:professional.country,
                contact:professional.contact,
                reviews:professional.reviews,
                postedBy:owner._id,
                refId:profId
            })

            await savedOwnerProfessional.save()
            res.json({isSaved:true})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getOwnerSavedProfessional = async(req,res) => {
    const ownerId = req.params.ownerId;

    try {
        const savedProfessional = await OwnerSavedProfessional.find({postedBy:ownerId});

        if(!savedProfessional){
            return res.status(404).json({ error: 'No saved professional found for this user' });
        }

        res.json({savedProfessional})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {savedOwnerProfessional,getOwnerSavedProf,deleteOwnerProfessional,countSavedByOwner,saveProfessionalToWishbook,getOwnerSavedProfessional}