import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const MOVIE_URL = `${BASE_URL}/api/movies`

export const findAllReviewsOfMovie = (mid) => {
    return axios.get(`${MOVIE_URL}/${mid}/movie-reviews`)
        .then(response => response.data);
}
