import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const MOVIE_URL = `${BASE_URL}/api/movie`

const api = axios.create({
    withCredentials: true
});

export const findPopularMovies = (page) => {
    return axios.get(`${MOVIE_URL}/popular/${page}`)
        .then(response => response.data);
}