const jwt = require('jsonwebtoken');

exports.authMiddleware = (role = [])=> {
  return (req,res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")){
      return res.status(401).json({message: "Unauthorized User"})
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = jwt.verify(token, process.env.JWT_TOKEN);
      if(role.length && !role.includes(decode.role)){
        return res.status(405).json({message: 'forbidden'})
      }
      req.user = decode;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid Token'})
    }
  }
}
