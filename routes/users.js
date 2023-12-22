// routes users.js
const express = require('express');
const router = express.Router();
const { deviceIdLogin, changePassword,  login, register, current, getAllUsers, remove } = require("../controllers/users");
const { auth } = require('../middleware/auth');

router.post("/changePassword/:id", auth, changePassword);
router.post("/deviceIdLogin", deviceIdLogin);
router.post("/login", login);
router.post("/register", register);
router.get("/current", auth, current);
router.get("/users", getAllUsers);
router.post("/remove/:id", auth, remove);

module.exports = router;   