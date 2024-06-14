const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const bearerToken = req.header("Authorization");
  //split the token
  const token = bearerToken.split(" ")[1];
  console.log(token);

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
