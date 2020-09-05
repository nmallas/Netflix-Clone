const express = require("express");
const { jwtConfig: { expiresIn }} = require('../../config');
const asyncHandler = require("express-async-handler");
const Cookies = require("js-cookie")
const {WatchList, Profile} = require("../../db/models")


const router = express.Router();

router.post("/", asyncHandler(async (req, res) => {
    const {name, imageLink, userId} = req.body;

    // check how many profiles
    const profiles = await Profile.findAll({
        where: {userId}
    })

    // If there are 3 or more, return
    if(profiles.length >= 3) {
        res.status(422).end
        return;
    }

    // Create a new watchlist
    const watchList = await WatchList.create();

    // Create a profile with that watchListId
    const profile = await Profile.create({
        name,
        imageLink,
        userId,
        watchListId: watchList.dataValues.id
    })

    res.send(profile.dataValues)
}))

router.get("/:userId", asyncHandler(async(req, res) => {
    let userId = req.params.userId;
    const profiles = await Profile.findAll({
        where: {userId}
    });
    let profileData = profiles.map(profile => profile.dataValues)
    res.send(profileData);
}))


module.exports = router;
