const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const profileUpload = require("../utils/profileUpload");

router.post("/login", authController.login);
router.post("/register", profileUpload.single("profile_image"),authController.register);


module.exports = router;
