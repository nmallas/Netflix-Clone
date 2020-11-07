const express = require("express");
const asyncHandler = require("express-async-handler");
const fetch = require("node-fetch");

const router = express.Router();

const apiKey = process.env.API_KEY;


router.get("/:id", asyncHandler(async function (req, res) {
    let id = req.params.id;
    let response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`);
    if(response.ok) {
        let data = await response.json();
        res.json(data.results);
        return;
    }
}))

module.exports = router;
