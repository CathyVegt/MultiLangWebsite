const express = require("express");
const router = express.Router();

const { login } = require("../controllers/user");
const authMiddleware = require('../middleware/auth')

router.route("/login").post(login);
router.route("/auth").get(authMiddleware);

module.exports = router;