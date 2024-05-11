require("dotenv").config({ path: "../.env" });

const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const router = express.Router();
const userModel = require("../Schems/user");
const helpers = require("../utils/helpers");
const auth = require("../middlewares/authMiddlewere");
router.use(auth.checkLoggedIn);
router.use(
  "/",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("This Email is invalid")
      .normalizeEmail(),
    body("password").isLength({ min: 6 }),
  ],

  async (req, res, next) => {
    let result = validationResult(req);
    if (!result.isEmpty()) {
      let respone = {
        status: "error",
        errors: result.errors.map((e) => {
          return { field: e.path, msg: e.msg };
        }),
      };
      return res.status(400).json(respone);
    } else {
      next();
    }
  }
);

router.post("/", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email: email });
    if (user) {
      let comparePassword = await helpers.compareHashed(
        password,
        user.password
      );
      if (comparePassword) {
        let token = jwt.sign(
          { id: user.id, email: user.email },
          process.env.secretKey,
          { expiresIn: "1h" }
        );
        res.cookie("token", token, {
          domain: `${process.env.origin}`,
          sameSite: "strict",
          httpOnly: true,
          maxAge: 3600000,
        });
        res.json({ status: "success", data: "You are successfully logged in" });
      } else {
        res.json({ status: "error", data: "Incorrect Email or Password " });
      }
    } else {
      res.json({ status: "error", data: "Incorrect Email or Password " });
    }
  } catch (e) {
    res.json({ status: "error", data: "something went wrong " });
  }
});

module.exports = router;
