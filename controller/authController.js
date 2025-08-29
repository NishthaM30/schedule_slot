const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

exports.login = async(req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if(!user){
    return res.status(400).json({message: "User not found"});
  }
  const match = await bcrypt.compare(password, user.password)
  if(!match){
    return res.status(400).json({ message: "Invalid credential" });
  }

  const token = jwt.sign(
    {id: user._id, role: user.role},
    process.env.JWT_TOKEN, {expiresIn: '1d'}
  );
  res.json({Token: token})
}

// module.exports = login;