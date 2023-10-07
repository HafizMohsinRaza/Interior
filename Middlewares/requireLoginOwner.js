const jwt = require('jsonwebtoken');
const {Owner} = require("../Models/OwnerModel");

const protect2 = (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization)
    {
        return res.status(401).json({error:"you must be logged in!"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,"abcdefghijklmnop",(err,payload) => {
        if(err){
            return res.status(401).json({error:"you must be logged in!"})
        }
        const {ownerId} = payload
        // console.log(payload)
        Owner.findById(ownerId).then(ownerdata => {
            
            req.owner = ownerdata
            
            next()
        })

    })
}

module.exports = {protect2}