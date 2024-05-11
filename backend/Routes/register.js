require("dotenv").config({ path: "../.env" });
const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const controllers = require("../controllers/register");
const middleWeres = require("../middlewares/authMiddlewere");
const userModel = require("../Schems/user");

Router.use("/", middleWeres.checkLoggedIn);

//validation
Router.use(
  "/",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("This Email is invalid")
      .normalizeEmail(),
    body("password").isLength({ min: 5 }),
    body("fname").notEmpty(),
  ],

  async (req, res, next) => {
    let { email } = req.body;
    let result = validationResult(req);
    if (!result.isEmpty()) {
      let respone = {
        status: "error",
        data: "Validation Error",
        errors: result.errors.map((e) => {
          return { field: e.path, msg: e.msg };
        }),
      };
      return res.status(400).json(respone);
    }
    let userQuery = await userModel.findOne({ email: email });

    userQuery == null
      ? next()
      : res.json({
          status: "error",
          data: "Email is already used",
        });
  }
);

Router.post("/", controllers.registerLogic);

module.exports = Router;
