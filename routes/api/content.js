const express = require("express");
const asyncHandler = require("express-async-handler");
const fetch = require("node-fetch");

const router = express.Router();

const apiKey = process.env.API_KEY;

const routeMatch = {
    'tr': `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=4&region=US`,
    'pn': `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    'ctv': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=35&with_original_language=en`,
    'hm': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27`,
    'am': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&page=3`,
    'dtv': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=18&with_original_language=en`,
    'cm': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&page=2`,
    'stv': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=10765&with_original_language=en`,
    // 'Trending Now': `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US&page=2`,
    // documentary: `/discover/movie?api_key=${apiKey}&with_genres=99`,
}

router.get("/:contentId", asyncHandler(async function (req, res) {
    let route = routeMatch[req.params.contentId];
    let response = await fetch(route);
    if(response.ok) {
        let data = await response.json();
        res.json(data.results);
        return;
    }
    res.status(404).end() }
))



module.exports=router;
