const express = require("express")

const router = express.Router()
const { registerUser, getUserData } = require("../controller/registration.contoller")

router.post("/register",registerUser)
router.get("/login",getUserData)

module.exports = router