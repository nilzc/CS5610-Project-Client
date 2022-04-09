import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const MOVIE_URL = `${BASE_URL}/api/movies`

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