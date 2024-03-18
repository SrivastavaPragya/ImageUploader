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

  const userId = req.headers.userId;
  if(!userId){
return res.status(404).json({message:"User not found"})
  }
  const Images= await Image.find({userId:userId});
  res.status(200).json({message:"all the Images",Images})
})


router.get("/images", authenticateJwt, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    // Find images with titles that match the filter query parameter, case-insensitive
    const images = await Image.find({
      title: {
        $regex: filter,
        $options: "i", // i for case insensitive
      },
    }).populate('userId', 'username'); // Assuming you want to include the username of the user who posted the image

    res.status(200).json({ images });
  } catch (error) {
    console.error("Error searching for images:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//post images --> saves images n details
router.post("/upload-image", authenticateJwt ,async (req, res) => {
    try {
      
      const {userId} = req.headers;
    
      const {title, image} = req.body;

      console.log(userId);
      //const imageURL = await cloudinary.uploader.upload(photo); //save to cloudinary return URL
      const imageURL = await cloudinary.uploader.upload(image, function (error, result) {
        if (error) {
          console.log(error);
        }
        console.log(result);
      });

  
      //creating new post in database
      const newImage= await Image.create({
        userId,
        title,
        imageURL: imageURL.url,
      });
  
      res.status(200).json({ message:"Image uploaded succesfully",success: true, data: newImage });

    } catch (err) {

      console.log(err);
      res.status(500).json({
       
        success: false,
        message: "Unable to create a Image, please try again",
      });
    }
  });



module.exports = router;
