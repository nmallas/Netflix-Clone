const apiKey = process.env.REACT_APP_API_KEY;

const routes = {
    'Top Rated': `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=2&region=us`,
    'Popular on NickFlix': `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    'Comedy TV Shows': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=35&with_original_language=en`,
    // 'Trending Now': `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US&page=2`,
    'Horror Movies': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27`,
    'Action Movies': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&page=3`,
    'Drama TV': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=18&with_original_language=en`,
    'Comedy Movies': `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&page=2`,
    // documentary: `/discover/movie?api_key=${apiKey}&with_genres=99`,
   'Scifi TV Shows': `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=10765&with_original_language=en`,
}

export default routes;
