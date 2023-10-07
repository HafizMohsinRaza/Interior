const { Owner } = require('../../Models/OwnerModel');
const {SavedProfessional} = require('../../Models/Wishbook/ProfessionalModel');


const savedProfessional = async(req,res) => {
    const {name,email,pic,companyName,address,city,country,rating,contact,reviews,refId} = req.body;

    const data = new SavedProfessional({
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
        postedBy:req.user,
        refId:refId
    })
    data.save().then(result => {
        res.status(201).send({"msg":"Saved Professional!",result})
    })
    .catch(err => {
        console.log(err)
    })

    // try {
    //     const alreadyPresent = await SavedProfessional.findOne({companyName})

    //     if(alreadyPresent)
    //     {
    //         return res.status(403).send({"msg":"This are already saved in your wishbook!"})
    //     }
    //     else{
            
    //     }
        
    // } catch (error) {
    //     res.status(500).send(error);
    // }
}

const getSavedProf = (req,res) => {
    SavedProfessional.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(myprof => {
        res.json({myprof})
    })
    .catch(err => {
        console.log(err)
    })
}

const deleteProfessional = async(req,res) => {
    const professional = await SavedProfessional.find({ refId: req.params.id });
    // console.log(location)
    if(professional.length > 0) {
        await SavedProfessional.deleteMany({ refId: req.params.id });
        res.json({ "msg": "Professional Removed!", professional:professional });
    }
    else {
        res.status(404).json({ msg: "Professional not found!" });
    }
}

const countSavedByUsers = async (req, res) => {
    const professionalId = req.params.professionalId; // Assuming professionalId is passed as a parameter

    try {
        const savedCount = await SavedProfessional.countDocuments({
            refId: professionalId
        });

        res.status(200).json({ count: savedCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while counting saved profiles.' });
    }
};

const saveProfessionalToWishbook = async(req,res) => {
    const {profId} = req.body;

    const user = req.user;

    try {
        const professional = await Owner.findById(profId);

        // console.log(professional)
        if(!professional){
            return res.status(404).json({ error: 'Professional not found' });
        }

        const existingProfessional = await SavedProfessional.findOne({
            refId:profId,
            postedBy:user._id
        })

        if(existingProfessional){
            await SavedProfessional.deleteOne({_id:existingProfessional._id})
            res.json({isSaved:false})
        } else {
            const savedProfessional = new SavedProfessional({
                name:professional.name,
                email:professional.email,
                pic:professional.pic,
                companyName:professional.companyName,
                address:professional.address,
                city:professional.city,
                country:professional.country,
                contact:professional.contact,
                reviews:professional.reviews,
                postedBy:user._id,
                refId:profId
            })

            await savedProfessional.save()
            res.json({isSaved:true})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getUserSavedProfessional = async(req,res) => {
    const userId = req.params.userId;
    try {
        const savedProfessional = await SavedProfessional.find({postedBy:userId});

        if(!savedProfessional) {
            return res.status(404).json({ error: 'No saved professional found for this user' });
        }

        res.json({savedProfessional})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {savedProfessional,deleteProfessional,getSavedProf,countSavedByUsers,saveProfessionalToWishbook,getUserSavedProfessional}