const jwt = require('jsonwebtoken');
const {User} = require('../Models/UserModel');

const protect = (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization)
    {
        return res.status(401).json({error:"you must be logged in!"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,'abcdefghijklmnop',(err,payload) => {
        if(err){
            return res.status(401).json({error:"You must be logged in!"})
        }
        const {userId} = payload
        User.findById(userId).then(userdata => {
            // console.log(userdata._id,"sahil")

            req.user = userdata
            next()
        })
    })
}

module.exports = {protect}