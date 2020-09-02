import React from "react";
import Logout from "./Logout";
import ContentRow from "./ContentRow";
const apiKey = process.env.REACT_APP_API_KEY;

console.log(apiKey);

const routes = {
    'Top Rated': `https://api.themoviedb.org/3movie/top_rated?api_key=${apiKey}&language=en-US&page=2&region=us`,
    'Popular': `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    'Trending': `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`,
    'Action': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`,
    'Comedy': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`,
    'Horror': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27`,
    // documentary: `/discover/movie?api_key=${apiKey}&with_genres=99`,
    'Comedy TV Shows': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=35&with_original_language=en`,
    'Drama TV': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=18&with_original_language=en`,
   ' Scifi TV Shows': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=10765&with_original_language=en`,
}

const Home = () => {
    return (
        <div>
            <h1>My Home Page</h1>
            {Object.values(routes).map(category => <ContentRow></ContentRow>)}
            <Logout/>
        </div>
    );
}

export default Home;
