// routes users.js
const express = require('express');
const router = express.Router();
const { login, register, current, getAllUsers } = require("../controllers/users");
const { auth } = require('../middleware/auth');

router.post("/login", login);
router.post("/register", register);
router.get("/current", auth, current);
router.get("/users", getAllUsers);

module.exports = router; 