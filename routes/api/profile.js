const express = require("express");
const { jwtConfig: { expiresIn }} = require('../../config');
const Cookies = require("js-cookie")


const router = express.Router();

// router.post("/", (req, res) => {

// })

// router.post("/:profileId", (req, res) => {
//     let profileId = req.params.profileId;
//     console.log("profileId")
// })

module.exports = router;
