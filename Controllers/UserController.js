const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User} = require("../Models/UserModel");
const {UserOtp} = require("../Models/UserOtp");
require('dotenv').config();
const nodemailer = require('nodemailer');
const SECRECT_KEY = "abcdefghijklmnop";
const crypto = require('crypto');


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"info.hmmtechpvtltd@gmail.com",
        pass:"brlfoxlgweplyukj"
    }
})


const userRegister = async(req,res) => {
    const {name,email,password,userId,pic} = req.body;

    const Role = "Customer";
    if(!email || !password || !name)
    {
        return res.status(422).json({error:"please add all fields !"})
    }

    try {
        const auth_user = await User.findOne({email});
        

        if(auth_user) 
        {
            return res.status(403).send({msg:"User are already exists!"});
        } 
        else
        {
            bcrypt.hash(password,5,async function (err,hash){
                if(err)
                {
                    return res.status(501).send(err);
                }

                try {
                    const new_user = new User({
                        name,
                        email,
                        password:hash,
                        role:Role,
                        pic:pic,
                        userId
                    });
                    await new_user.save();
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

const userOtpSend = async(req,res) => {
    const {email} = req.body;

    if(!email){
        res.status(400).send({error:"Please enter your email data"})
    }

    try {
        const preuser = await User.findOne({email:email})

        if(preuser){
            const OTP = Math.floor(100000+Math.random()*900000);

            const existEmail = await UserOtp.findOne({email:email})

            if(existEmail){
                const updateData = await UserOtp.findByIdAndUpdate({_id:existEmail._id},{
                    otp:OTP
                },{new:true});

                await updateData.save()

                const mailOptions = {
                    from:process.env.EMAIL,
                    to:email,
                    subject:"Sending Email For Otp Validation for User LogIn!",
                    text:`
                    Greetings,

                    Thank you for completing your registration with Homminterior! You've made an excellent decision! :)

                    Homminterior stands out as one of the most rapidly growing portals in the Indian interior industry. We believe that this marks the beginning of a mutually beneficial, long-term relationship.

                    Warm regards,
                    The Homminterior Team

                    [🔑] Your verification code for Homminterior: ${OTP}
                    Your security is our priority, please keep this code confidential.`
                }

                transporter.sendMail(mailOptions,(error,info) => {
                    if(error){
                        console.log("error",error)
                        res.status(400).json({error:"email not send"})
                    }else{
                        res.status(200).json({message:"Email sent successfully"})
                    }
                })
            }else{
                const saveOtpData = new UserOtp({
                    email,
                    otp:OTP
                })

                await saveOtpData.save()

                const mailOptions = {
                    from:process.env.EMAIL,
                    to:email,
                    subject:"Sending Email For Otp Validation for User LogIn!",
                    text:`Greetings,

                    Thank you for completing your registration with Homminterior! You've made an excellent decision! :)

                    Homminterior stands out as one of the most rapidly growing portals in the Indian interior industry. We believe that this marks the beginning of a mutually beneficial, long-term relationship.
                    
                    Warm regards,
                    The Homminterior Team

                    [🔑] Your verification code for Homminterior: ${OTP}
                    Your security is our priority, please keep this code confidential.`
                }

                transporter.sendMail(mailOptions,(error,info) => {
                    if(error){
                        console.log("error",error)
                        res.status(400).json({error:"email not send"})
                    }else{
                        // console.log("Email sent",info.response);
                        res.status(200).json({message:"Email sent successfully"})
                    }
                })
            }
        }else{
            res.status(400).send({error:"This user not exist"})
        }
    } catch (error) {
        res.status(400).json({error:"Invalid Details" , error})
    }
}

const userLogin = async(req,res) => {
    const {email,otp} = req.body;

    if(!otp || !email) {
        res.status(400).json({ error: "Please Enter Your OTP and email" })
    }

    try {
        const otpverification = await UserOtp.findOne({email:email})

        if(otpverification.otp == otp){
            const preuser = await User.findOne({email:email});
            const userId = preuser._id
            const token = jwt.sign({userId},SECRECT_KEY)
            res.status(200).json({message:"User Login Succesfully Done",token:token,role:preuser.role,userId:preuser._id});
        }else{
            res.status(400).json({error:"Invalid Otp"})
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid Details", error })
    }
}

const loginWithSocialMedia = async (req, res) => {
    try {
      const { sub, given_name, family_name, nickname, picture, email_verified } = req.body;
  
      let user = await User.findOne({ userId: sub });
  
      // If the user doesn't exist, create a new user
      if (!user) {
        user = new User({
          name: given_name + ' ' + family_name,
          email: email_verified ? req.body.email : '',
          pic: picture,
          role: 'Customer',
          userId: sub,
        });
  
        await user.save();
      }
  
      // Generate a JWT token for the user
      const token = jwt.sign({ userId: user._id }, SECRECT_KEY); // Replace 'your-secret-key' with your actual secret key
  
      res.json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

const updateUserProfile = async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;
        user.phone = req.body.phone || user.phone;
        user.gender = req.body.gender || user.gender;

        const updatedUser = await user.save();

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            pic:updatedUser.pic,
            phone:updatedUser.phone,
            gender:updatedUser.gender
        })
    }
    else{
        res.status(404)
        throw new Error("User not found!");
    }

    
}

const getUserProfile = async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.json(user)
    }
    else{
        res.json({"msg":"User not found"})
    }
}

// const forgotPassword = async(req,res) => {
//     const { email } = req.body;

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Generate a password reset token
//     const token = crypto.randomBytes(20).toString('hex');
//     user.resetPasswordToken = token;
//     user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
//     await user.save();

//     // Create reusable transporter object using SMTP transport
//     const transporter = nodemailer.createTransport({
//       // Configure your email provider details here
//       service: 'Gmail',
//       auth: {
//         user: 'kumarsahil8981@gmail.com',
//         pass: 'Sahilkr#123'
//       }
//     });

//     // Setup email data
//     const mailOptions = {
//       from: 'kumarsahil8981@gmail.com',
//       to: user.email, // Use the user's email address
//       subject: 'Password Reset Request',
//       text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
//         + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
//         + `http://${req.headers.host}/reset-password/${token}\n\n`
//         + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
//     };

//     // Send the email
//     await transporter.sendMail(mailOptions);

//     res.json({ message: 'Password reset email sent' });
//   } catch (error) {
//     console.error('Error sending password reset email:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// }

const forgotPassword2 = async(req,res) => {
    const {email} = req.body;

    if(!email)
    {
        res.status(401).json({status:401,message:"Enter your email"})
    }

    try {
        const userFind = await User.findOne({email:email});
        
        //token generate for reset password
        const token = jwt.sign({_id:userFind._id},process.env.SECRET_KEY,{
            expiresIn:"120s"
        })
        
        const setusertoken = await User.findByIdAndUpdate({_id:userFind._id},{verifytoken:token},{new:true});
        // console.log(setusertoken);
        
        if(setusertoken){
            const mailOptions = {
                from:"kumarsahil8981@gmail.com",
                to:email,
                subject:"Sending Email For password reset",
                text:`This link valid for 2 Minutes http://homminterior.com/forgotpassword/${userFind.id}/${setusertoken.verifytoken}`
            }
            transporter.sendMail(mailOptions,(error,info) => {
                if(error){
                    console.log(error)
                    res.status(401).json({status:401,message:"email not send"})
                } else {
                    // console.log("email sent",info.response);
                    res.status(201).json({status:201,message:"Email Sent Successfully!"})
                }
            })
        }
    } catch (error) {
        res.status(401).json({status:401,message:"Invalid User"})
    }
}

//verify user for forgot password

const validUser = async(req,res) => {
    const {id,token} = req.params;
    // console.log(id,token);
    try {
        const validuser = await User.findOne({_id:id,verifytoken:token})
        
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(401).json({status:401,message:"User Not Exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
}

const changePassword = async(req,res) => {
    const { id, token } = req.params;
  const { password } = req.body;

  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (verifyToken._id !== id) {
      return res.status(401).json({ status: 401, message: "Invalid token" });
    }

    const validUser = await User.findById(id);

    if (!validUser) {
      return res.status(401).json({ status: 401, message: "User Not Exist" });
    }

    const newpassword = await bcrypt.hash(password, 5);
    console.log(newpassword)
    validUser.password = newpassword;
    await validUser.save();

    res.status(201).json({ status: 201, message: "Password changed successfully" });
  } catch (error) {
    res.status(401).json({ status: 401, message: "Invalid token" });
  }
}


module.exports = {userRegister,userLogin,updateUserProfile,getUserProfile,forgotPassword2,validUser,changePassword,userOtpSend,loginWithSocialMedia}