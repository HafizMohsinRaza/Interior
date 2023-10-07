const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Admin} = require("../../Models/Admin/AdminModel");
require('dotenv').config();


const adminRegister = async(req,res) => {
    const {name,email,password} = req.body;

    if(!email || !password || !name)
    {
        return res.status(422).json({error:"please add all fields !"})
    }

    try {
        const auth_admin = await Admin.findOne({email})

        if(auth_admin)
        {
            return res.status(403).send({msg:"User are already exists!"});
        }
        else
        {
            bcrypt.hash(password,5,async function (err,hash) {
                if(err)
                {
                    return res.status(501).send(err);
                }
                try {
                    const new_admin = new Admin({
                        name,
                        email,
                        password:hash
                    })
                    await new_admin.save()
                    return res.status(201).send({"msg":"Signup Successfully"})
                } catch (error) {
                    return res.status(403).send(error)
                }
            })
        }
    } catch (error) {
        return res.status(500).send(err)
    }
}

const adminLogin = async(req,res) => {
    const {email,password} = req.body;

    const validAdmin = await Admin.findOne({email})

    if(validAdmin)
    {
        const adminId = validAdmin._id;
        const hash = validAdmin.password;
        const name = validAdmin.name;
        const email = validAdmin.email

        try {
            await bcrypt.compare(password,hash,async function (err,result){
                if(err){
                    return res.status(500).send(err)
                }
                if(result){
                    const token = jwt.sign({adminId},"abcdefghijklmnop");
                    return res.status(201).send({"msg":"Login success",token:token,name:name,email:email,adminId})
                }
                else {
                    return res.status(401).send({"msg":"Login Failed please check email & password!"})
                }
            })
        } catch (error) {
            return res.status(401).send({"msg":"Login Failed!"})
        }
    }
    else {
        return res.status(401).send({ "msg": "Login failed!" })
    }
}

const updateAdminProfile = async(req,res) => {
    const admin = await Admin.findById(req.admin._id)

    if(admin) {
        admin.name = req.body.name || admin.name;
        admin.email = req.body.email || admin.email;
        admin.phone = req.body.phone || admin.phone;

        if(req.body.password){
            admin.password = req.body.password;
        }

        const updatedAdmin = await admin.save();

        res.json(updatedAdmin)
    }
    else {
        res.status(404)
        throw new Error("Admin not found!");
    }
}

const updateProfileWithPassword = async(req,res) => {
    const { adminId, name, email, phone, currentPassword, newPassword } = req.body;
    const { admin } = req; // The admin data is available in req.admin from the middleware

    try {
        // If the currentPassword and newPassword are provided, update the password first
        if (currentPassword && newPassword) {
        // Compare the current password with the stored password
        const passwordMatch = await bcrypt.compare(currentPassword, admin.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the admin's password in the database
        await Admin.findByIdAndUpdate(admin._id, { password: hashedNewPassword });
        }

        // Update other fields (name, email, phone) of the admin's data in the database
        const updatedAdmin = await Admin.findByIdAndUpdate(
        admin._id,
        { name, email, phone },
        { new: true } // To get the updated document after the update
        );

        res.json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Error while updating admin data' });
    }
}

const getAdminProfile = async(req,res) => {
    try {
        const { admin } = req; // The admin data is available in req.admin from the middleware
        res.json(admin);
      } catch (error) {
        res.status(500).json({ error: 'Error while fetching admin data' });
      }
}

module.exports = {adminRegister,adminLogin,updateAdminProfile,updateProfileWithPassword,getAdminProfile}