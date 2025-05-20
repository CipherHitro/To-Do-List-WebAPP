const jwt = require("jsonwebtoken");
const secret = "Rohit@29@15";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    secret
  );
}

function getUser(token) {
    if(!token) {
        return null
    }
    try{
        return jwt.verify(token , secret)
    } catch {
        
        return null
    }
}

module.exports = {
    setUser, 
    getUser,
}