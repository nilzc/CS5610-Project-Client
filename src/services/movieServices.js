import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const MOVIE_URL = `${BASE_URL}/api/movies`;
const SEARCH_URL = `${BASE_URL}/api/search`;
const MOVIE_STATS_URL = `${BASE_URL}/api/movie-stats`;
const USER_URL = `${BASE_URL}/api/users`;

const api = axios.create({
    withCredentials: true
});

export const findPopularMovies = (page) => {
    return axios.get(`${MOVIE_URL}/popular/${page}`)
        .then(response => response.data.results);
}
export const findNowPlayingMovies = (page) => {
    return axios.get(`${MOVIE_URL}/now-playing/${page}`)
        .then(response => response.data.results);
}
export const findTopRatedMovies = (page) => {
    return axios.get(`${MOVIE_URL}/top-rated/${page}`)
        .then(response => response.data.results);
}
export const findUpcomingMovies = (page) => {
    return axios.get(`${MOVIE_URL}/upcoming/${page}`)
        .then(response => response.data.results);
}
export const searchMovie = (query, page) => {
    return axios.get(SEARCH_URL, {params: {query: query, page: page}})
        .then(response => response.data.results);
}
export const findMovieDetail = (mid) => {
    return axios.get(`${MOVIE_URL}/${mid}`)
        .then(response => response.data);
}
export const getRecommendationsByMovie = (mid, page) => {
    return axios.get(`${MOVIE_URL}/${mid}/recommendations/${page}`)
        .then(response => response.data.results);
}
export const findMovieStats = (mid) => {
    return axios.get(`${MOVIE_STATS_URL}/${mid}`)
        .then(response => response.data);
}
export const userLikesMovie = (uid, mid) => {
    return api.post(`${USER_URL}/${uid}/movie-likes/${mid}`)
        .then(response => response.data);
}
export const findAllMoviesLikedByUser = (uid) => {
    return api.get(`${USER_URL}/${uid}/movie-likes`)
        .then(response => response.data);
}
export const findAllMoviesLikedByUserWithMovieDetails = async (uid) => {
    let movies = await findAllMoviesLikedByUser(uid);
    movies = movies.map(m => m.movieId);
    movies = await Promise.all(movies.map(async mid => await findMovieDetail(mid)));
    return movies;
}
export const findUserLikesMovie = (uid, mid) => {
    return api.get(`${USER_URL}/${uid}/movie-likes/${mid}`,
        {headers: {"Cache-Control": "no-cache"}})
        .then(response => response.data);
}