const jwt = require("jsonwebtoken");
const SECRET = "SECr3mm";


const authenticateJwt = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (authHeader) {

    const token = authHeader.split(" ")[1]; 

    if(!token){
        res.json({message:"token not defined"});
    }

    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.userId = user._id;
      next();
    });
  } else {
    res.sendStatus(401).json({message:"Authentication failed"});
  }
};


module.exports = authenticateJwt;