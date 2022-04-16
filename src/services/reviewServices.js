import axios from "axios";
import * as movieServices from "./movieServices";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const MOVIE_URL = `${BASE_URL}/api/movies`
const USER_URL = `${BASE_URL}/api/users`

const api = axios.create({
    withCredentials: true
});

export const findAllReviewsOfMovie = (mid) => {
    return api.get(`${MOVIE_URL}/${mid}/movie-reviews`)
        .then(response => response.data);
}

export const createReview = (uid, review) => {
    return api.post(`${USER_URL}/${uid}/movie-reviews`, review)
        .then(response => response.data);
}

export const findReviewOnMovieOwnedByUser = (uid, rid) => {
    return api.get(`${USER_URL}/${uid}/movie-reviews/${rid}`)
        .then(response => response.data);
}

export const deleteReview = (uid, rid) => {
    return api.delete(`${USER_URL}/${uid}/movie-reviews/${rid}`)
        .then(response => response.data);
}

export const findAllReviewsOwnedByUser = (uid) => {
    return api.get(`${USER_URL}/${uid}/movie-reviews`)
        .then(response => response.data);
}
export const findAllReviewsOwnedByUserWithMovieDetails = async (uid) => {
    let reviews = await findAllReviewsOwnedByUser(uid);
    reviews = await Promise.all(reviews.map(async r => {
        r.movie = await movieServices.findMovieDetail(r.movieId);
        return r;
    }));
    return reviews;
}