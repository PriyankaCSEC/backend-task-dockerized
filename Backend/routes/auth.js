const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { signup, login } = require("../controllers/authController");
//these are auth routed
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
