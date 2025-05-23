const formidable = require("formidable");
const User = require("../model/user.model");
const crypto = require("crypto"); 
const jwt = require("jsonwebtoken")
module.exports = {
  registerUser: async (req, res) => {
    try {
      const form = new formidable.IncomingForm({ multiples: true });
      form.parse(req, async (error, fields, files) => {
        const email = fields.email?.[0];
        if (!email) {
          return res.status(400).json({
            success: false,
            message: "Email is required",
          });
        }
        const user = await User.findOne({ email: email });
        if (user) {
          return res
            .status(200)
            .json({ success: false, message: "this email is already exist" });
        }
        const clientId = crypto.randomBytes(16).toString("hex");      // 32 hex chars
        const clientSecret = crypto.randomBytes(32).toString("hex"); 
        const newUser = new User({
          email: fields.email[0],
          name: fields.name[0],
          mobileNo: fields.mobileNo[0],
          githubUserName: fields.githubUserName[0],
          rollNo: fields.rollNo[0],
          collegeName: fields.collegeName[0],
          accessCode: fields.accessCode[0],
          clientId: clientId,
          clientSecret: clientSecret
        });
        let savedUser = await newUser.save();
        res.status(200).json({
          success: true,
          data: savedUser,
          message: "User registered successfully",
        });
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({
        success: false,
        message: "User is not registered",
      });
    }
  },
  getUserData: async (req, res) => {
     
    try {
      const email = req.query.email;

      const user = await User.findOne({ email: email, }).select(["-collegeName -githubUserName -phoneNo"]);
      const jwtSecret = process.env.jwtSecret
      
      
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(404).json({ success: false, message: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Internal server error ",
      });
    }
  },
};
