import axios from "axios";
import * as movieServices from "./movieServices";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USER_URL = `${BASE_URL}/api/users`
const LIST_URL = `${BASE_URL}/api/movie-lists`

const api = axios.create({
    withCredentials: true
});

export const createList = (uid, movieList) => {
    return api.post(`${USER_URL}/${uid}/movie-lists`, movieList)
        .then(response => response.data);
}
export const findAllListsOwnedByUser = (uid) => {
    return api.get(`${USER_URL}/${uid}/movie-lists`)
        .then(response => response.data);
}
export const findAllListsOwnedByUserWithMovieDetails = async (uid) => {
    let lists = await findAllListsOwnedByUser(uid)
    lists = await Promise.all(lists.map(async l => {
        l.movies = await Promise.all(l.movies.map(async mid => await movieServices.findMovieDetail(mid)));
        return l;
    }))
    return lists;
}