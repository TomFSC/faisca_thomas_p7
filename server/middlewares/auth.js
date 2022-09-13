//-----------Modules import---------
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  //Get the token in headers
  const { authorization } = req.headers;
  //Verify the token and add userId and isAdmin in request
  try {
    const token = authorization;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    req.auth = {
      userId: userId,
      isAdmin: isAdmin,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
