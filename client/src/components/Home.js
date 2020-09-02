import React from "react";
import ContentRow from "./ContentRow";
import Header from "./Header";
const apiKey = process.env.REACT_APP_API_KEY;

console.log(apiKey);

const routes = {
    'Top Rated': `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=2&region=us`,
    'Popular': `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    'Trending': `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US&page=2`,
    'Action': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28`,
    'Comedy': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35`,
    'Horror': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27`,
    // documentary: `/discover/movie?api_key=${apiKey}&with_genres=99`,
    'Comedy TV Shows': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=35&with_original_language=en`,
    'Drama TV': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=18&with_original_language=en`,
   'Scifi TV Shows': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=10765&with_original_language=en`,
}

const Home = () => {

    return (
        <div>
            <Header/>
            {Object.entries(routes).map(category => <ContentRow category={category[0]} route={category[1]} ></ContentRow>)}
        </div>
    );
}

export default Home;
