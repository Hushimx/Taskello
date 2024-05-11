const jwt = require("jsonwebtoken");
const helpers = require("../utils/helpers");

module.exports.registerLogic = async (req, res) => {
  try {
    let { email, password, fname } = req.body;
    password = await helpers.hashPassword(password);

    let status = await helpers.CreateUser(email, fname, password);
    if (status.status) {
      let token = jwt.sign(
        { id: status.data.id, email: status.data.email },
        process.env.secretKey,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, {
        domain: "127.0.0.1",
        sameSite: "strict",
        httpOnly: true,
        maxAge: 3600000,
      });
      res.json({
        status: "success",
        data: "You're account has been registerd successfully",
      });
    } else {
      res.json({ status: "error", data: status.data });
    }
  } catch (e) {
    res.json(e);
  }
};

// module.exports.checkInputs = async (req, res, next) => {
//   let { email } = req.body;
//   let result = validationResult(req);
//   if (!result.isEmpty()) {
//     let respone = {
//       status: "error",
//       errors: result.errors.map((e) => {
//         return { field: e.path, msg: e.msg };
//       }),
//     };
//     return res.status(400).json(respone);
//   }
//   let userQuery = await userModel.findOne({ email: email });

//   userQuery == null ? next() : res.send("already used");
// };

module.exports.registerAuth = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const jutVerify = await jwt.verify(
        req.cookies.token,
        process.env.secretKey
      );
      res.send("Already logined");
    } catch (error) {
      res.clearCookie("token");
      next();
    }
  } else {
    next();
  }
};
