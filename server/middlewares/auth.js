const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
