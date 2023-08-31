const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

// Remplacez 'your-secret-key' par votre propre clé secrète
const JWT_SECRET = "your-secret-key";

// Validation schema using Joi
const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

// POST /api/auth
router.post("/", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      JWT_SECRET
    );

    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

