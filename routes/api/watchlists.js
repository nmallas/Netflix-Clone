const express = require("express");
const asyncHandler = require("express-async-handler");
const {WatchListContent, WatchList} = require("../../db/models")

const router = express.Router();

router.post("/:watchListId", asyncHandler(async (req, res) => {
    let watchListId = req.params.watchListId;
    console.log(watchListId);
    let watchListContent = await WatchListContent.findAll({
        where: {watchListId}
    })
    if (watchListContent.length > 20) {
        res.status(422).end()
    }
    let newItem = await WatchListContent.create({
        watchListId,
        poster_path: req.body.path
    })
    res.json([...watchListContent, newItem]);
}))

router.get("/:watchListId", asyncHandler(async (req, res) => {
    let watchListId = req.params.watchListId;
    let watchListContent = await WatchListContent.findAll({
        where: {watchListId}
    })
    res.json(watchListContent);
}))




module.exports = router;
