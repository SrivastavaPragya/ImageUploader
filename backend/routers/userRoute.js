const express = require("express");
const router = new express.Router();
const { User, Image } = require("../db/models/Schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticateJwt = require("../middleware/auth");
// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require("cloudinary").v2;
const SECRET = "SECr3mm";

          
cloudinary.config({ 
  cloud_name: 'djyttu2cb', 
  api_key: '753644551323735', 
  api_secret: 'prlBaMrbcuim8CUtlZ8ySSgJ68Y' 
});


router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    return res.status(403).json({ message: "User already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "User created successfully" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "User logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});


//get all images --> get all user's image
router.get("/all",authenticateJwt,async(req, res)=>{
  const Images= await Image.find();
  res.status(200).json({message:"all the courses",Images})
})


//get filtered images --> get all user's filter image --> localhost:3000//user/images?filter=om
router.get("/images",authenticateJwt,async(req,res)=>{

})


//post images --> saves images n details
router.post("/upload-image", authenticateJwt ,async (req, res) => {
    try {
      
      const {userId} = req;
      const {title, photo} = req.body;
      //const imageURL = await cloudinary.uploader.upload(photo); //save to cloudinary return URL
      const imageURL = await cloudinary.uploader.upload(photo, { use_filename: true, resource_type: "image" });

  
      //creating new post in database
      const newPost = await Post.create({
        userId,
        title,
        imageURL: imageURL.url,
      });
  
      res.status(200).json({ message:"Image uploaded succesfully",success: true, data: newPost });

    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to create a post, please try again",
      });
    }
  });



module.exports = router;
