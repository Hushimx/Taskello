require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
module.exports.checkLoggedIn = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const jutVerify = await jwt.verify(
        req.cookies.token,
        process.env.secretKey
      );
      res.json({ status: "login", data: "Already logged in" });
    } catch (error) {
      res.clearCookie("token");
      next();
    }
  } else {
    next();
  }
};
