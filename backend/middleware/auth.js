const jwt = require("jsonwebtoken");
const SECRET = "SECr3mm";
const {User, Image}=require('../db/models/Schema')

const authenticateJwt = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (authHeader) {

    const token = authHeader.split(" ")[1]; 

    if(!token){
        res.json({message:"token not defined"});
    }

    jwt.verify(token, SECRET,async (err, data) => {
      if (err) {
        return res.sendStatus(403);
      }
      const user= await User.findOne({username:data.username})
      if(!user){
        res.json({message:"User not found"})
      }
      req.headers["userId"]=user._id
      next()
    });
  } else {
    res.sendStatus(401).json({message:"Authentication failed"});
  }
};


module.exports = authenticateJwt;