const express = require("express");
const asyncHandler = require("express-async-handler");
const {WatchListContent, WatchList} = require("../../db/models")

const router = express.Router();

router.post("/:watchListId", asyncHandler(async (req, res) => {
    let watchListId = req.params.watchListId;
    let watchListContent = await WatchListContent.findAll({
        where: {watchListId}
    })
    if (watchListContent.length > 20) {
        res.status(422).end();
        return;
    }
    if(watchListContent.map(wc => wc.poster_path).includes(req.body.path)) {
        res.status(422).end();
        return;
    }

    let newItem = await WatchListContent.create({
        watchListId,
        poster_path: req.body.path
    })
    res.json([...watchListContent, newItem]);
}))


router.delete("/:contentId", asyncHandler(async (req, res) => {
    let id = req.params.contentId;
    let watchListId = req.body.watchListId;

    await WatchListContent.destroy({
        where: { id }
    })

    let watchListContent = await WatchListContent.findAll({
        where: {watchListId}
    })

    res.json(watchListContent);
}))

router.get("/:watchListId", asyncHandler(async (req, res) => {
    let watchListId = req.params.watchListId;
    let watchListContent = await WatchListContent.findAll({
        where: {watchListId}
    })
    res.json(watchListContent);
}))




module.exports = router;
