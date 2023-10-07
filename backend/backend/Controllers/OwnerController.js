const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");
const SECRECT_KEY = "abcdefghijklmnop";

const { Owner } = require("../Models/OwnerModel");
const { OwnerPost } = require("../Models/OwnerPostModel");
const { OwnerOtp } = require("../Models/OwnerOtp");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const ownerRegister = async (req, res) => {
  const { name, email, password, ownerId, pic, role } = req.body;

  if (!email || !password || !name) {
    return res.status(422).json({ error: "please add all fields !" });
  }

  try {
    const auth_owner = await Owner.findOne({ email });
    if (auth_owner) {
      return res.status(403).send({ msg: "User are already exists!" });
    } else {
      bcrypt.hash(password, 5, async function (err, hash) {
        if (err) {
          return res.status(501).send(err);
        }
        try {
          const new_owner = new Owner({
            name,
            email,
            password: hash,
            role: role,
            pic: pic,
            ownerId,
          });
          await new_owner.save();
          return res.status(201).send({ msg: "Signup Successfully" });
        } catch (error) {
          return res.status(403).send(error);
        }
      });
    }
  } catch (error) {
    return res.status(500).send(err);
  }
};

const ownerOtpSend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).send({ error: "Please enter your email data" });
  }

  try {
    const preowner = await Owner.findOne({ email: email });

    if (preowner) {
      const OTP = Math.floor(100000 + Math.random() * 900000);

      const existEmail = await OwnerOtp.findOne({ email: email });

      if (existEmail) {
        const updateData = await OwnerOtp.findByIdAndUpdate(
          { _id: existEmail._id },
          {
            otp: OTP,
          },
          { new: true }
        );

        await updateData.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For Otp Validation for Owner LogIn!",
          text: `Greetings,

          Thank you for completing your registration with Homminterior! You've made an excellent decision! :)

          Homminterior stands out as one of the most rapidly growing portals in the Indian interior industry. We believe that this marks the beginning of a mutually beneficial, long-term relationship.

          We've noticed that your gallery is currently without any pictures. (To activate your profile, we require a minimum of 8-10 images). Kindly log in and finalize your registration by uploading more 
          images.

          Should you require any further assistance, please feel free to reach out to us.

          Warm regards,
          The Homminterior Team

          [🔑] Your verification code for Homminterior: ${OTP}
          Your security is our priority, please keep this code confidential.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            res.status(200).json({ message: "Email sent successfully" });
          }
        });
      } else {
        const saveOtpData = new OwnerOtp({
          email,
          otp: OTP,
        });

        await saveOtpData.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For Otp Validation for Owner LogIn!",
          text: `Greetings,

          Thank you for completing your registration with Homminterior! You've made an excellent decision! :)

          Homminterior stands out as one of the most rapidly growing portals in the Indian interior industry. We believe that this marks the beginning of a mutually beneficial, long-term relationship.

          We've noticed that your gallery is currently without any pictures. (To activate your profile, we require a minimum of 8-10 images). Kindly log in and finalize your registration by uploading more 
          images.

          Should you require any further assistance, please feel free to reach out to us.

          Warm regards,
          The Homminterior Team

          [🔑] Your verification code for Homminterior: ${OTP}
          Your security is our priority, please keep this code confidential.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent successfully" });
          }
        });
      }
    } else {
      res.status(400).send({ error: "This owner not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

const ownerLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp || !email) {
    res.status(400).json({ error: "Please Enter Your OTP and email" });
  }

  try {
    const otpverification = await OwnerOtp.findOne({ email: email });

    if (otpverification.otp == otp) {
      const preowner = await Owner.findOne({ email: email });
      const ownerId = preowner._id;
      const token = jwt.sign({ ownerId }, SECRECT_KEY);
      res
        .status(200)
        .json({
          message: "Owner Login Succesfully Done",
          token: token,
          role: preowner.role,
          ownerId: preowner._id,
        });
    } else {
      res.status(400).json({ error: "Invalid Otp" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};

const updateOwner = async (req, res) => {
  const owner = await Owner.findById(req.owner._id);

  if (owner) {
    owner.name = req.body.name || owner.name;
    owner.email = req.body.email || owner.email;
    owner.pic = req.body.pic || owner.pic;
    owner.role = req.body.role || owner.role;

    owner.companyName = req.body.companyName || owner.companyName;
    owner.category = req.body.category || owner.category;
    owner.companyFilter = req.body.companyFilter || owner.companyFilter;
    owner.contact = req.body.contact || owner.contact;
    owner.projectStartingCost =
      req.body.projectStartingCost || owner.projectStartingCost;
    owner.address = req.body.address || owner.address;
    owner.city = req.body.city || owner.city;
    owner.state = req.body.state || owner.state;
    owner.country = req.body.country || owner.country;
    owner.pincode = req.body.pincode || owner.pincode;
    owner.aboutUs = req.body.aboutUs || owner.aboutUs;
    owner.services = req.body.services || owner.services;
    owner.achievements = req.body.achievements || owner.achievements;
    owner.profInfo = req.body.profInfo || owner.profInfo;
    owner.websiteLink = req.body.websiteLink || owner.websiteLink;
    owner.facebookLink = req.body.facebookLink || owner.facebookLink;
    owner.instagramLink = req.body.instagramLink || owner.instagramLink;
    owner.youtubeLink = req.body.youtubeLink || owner.youtubeLink;
    owner.emailId = req.body.emailId || owner.emailId;
    owner.areaOfSurvice = req.body.areaOfSurvice || owner.areaOfSurvice;

    const updatedOwner = await owner.save();

    res.json(updatedOwner);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
};

const getOwnerById = async (req, res) => {
  const owner = await Owner.findById(req.params.id);

  if (owner) {
    res.json(owner);
  } else {
    res.status(404).json({ message: "Owner not found" });
  }
};

const getAllOwner = async (req, res) => {
  // const { query } = req.query;

  const AllOwner = await Owner.find().populate(
    "reviews.postedBy",
    "_id name pic"
  );

  res.json({ Owner: AllOwner });
};

const subOwnerPost = (req, res) => {
  Owner.findOne({ _id: req.params.id })
    .populate("reviews.postedBy", "_id name pic")
    .populate("reviews", "_id text rating pic")
    .then((owner) => {
      OwnerPost.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")

        .then((posts) => {
          res.json({ owner, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "Owner Not Found!" });
    });
};

const reviewPost = (req, res) => {
  const unixTimestamp = Date.now();
  const review = {
    text: req.body.text,
    rating: req.body.rating,
    pic: req.body.pic,
    postedBy: req.user._id,
    time: new Date(unixTimestamp),
  };

  Owner.findByIdAndUpdate(
    req.body.ownerId,
    {
      $push: { reviews: review },
    },
    {
      new: true,
    }
  )
    .populate("reviews.postedBy", "_id name pic")
    .then((review) => {
      res.json({ review });
    })
    .catch((err) => {
      res.json(err);
    });
};

const forgotPasswordOnwer = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter your email" });
  }

  try {
    const ownerFind = await Owner.findOne({ email: email });

    const token = jwt.sign({ _id: ownerFind._id }, process.env.SECRET_KEY, {
      expiresIn: "120s",
    });

    const setownertoken = await Owner.findByIdAndUpdate(
      { _id: ownerFind._id },
      { verifytoken: token },
      { new: true }
    );

    if (setownertoken) {
      const mailOptions = {
        from: "kumarsahil8981@gmail.com",
        to: email,
        subject: "Sending Email For password reset",
        text: `This link valid for 2 Minutes http://homminterior.com/ownerforgotpassword/${ownerFind.id}/${setownertoken.verifytoken}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "Email Sent Successfully!" });
        }
      });
    }
  } catch (error) {}
};

const validOwner = async (req, res) => {
  const { id, token } = req.params;

  try {
    const validowner = await Owner.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    // console.log(validowner,verifyToken)

    if (validowner && verifyToken._id) {
      res.status(201).json({ status: 201, validowner });
    } else {
      res.status(401).json({ status: 401, message: "Owner Not Exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

const ownerChangePassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    if (verifyToken._id !== id) {
      return res.status(401).json({ status: 401, message: "Invalid token" });
    }

    const validOwner = await Owner.findById(id);

    if (!validOwner) {
      return res.status(401).json({ status: 401, message: "User Not Exist" });
    }

    const newpassword = await bcrypt.hash(password, 5);

    validOwner.password = newpassword;
    await validOwner.save();

    res
      .status(201)
      .json({ status: 201, message: "Password changed successfully" });
  } catch (error) {
    res.status(401).json({ status: 401, message: "Invalid token" });
  }
};

//Contact This Professional Button Count for per Owner Account

const contactButtonClickCount = async (req, res) => {
  const ownerId = req.params.ownerId;

  try {
    const owner = await Owner.findById(ownerId);

    if(!owner){
        return res.status(404).json({ message: 'Owner not found' });
    }

    owner.clickCount += 1;
    await owner.save();
    return res.status(200).json({ message: 'Click count updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getContactButtonClickCount = async(req,res) => {
    try {
        const ownerId = req.params.ownerId;
        const owner = await Owner.findById(ownerId).select('name clickCount');

        if(!owner) {
            return res.status(404).json({ error: 'Owner not found' });
        }
        res.json(owner)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
  ownerRegister,
  ownerLogin,
  updateOwner,
  getAllOwner,
  subOwnerPost,
  reviewPost,
  getOwnerById,
  forgotPasswordOnwer,
  validOwner,
  ownerChangePassword,
  ownerOtpSend,
  contactButtonClickCount,
  getContactButtonClickCount
};
