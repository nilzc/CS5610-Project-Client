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
export const findListById = (lid) => {
    return api.get(`${LIST_URL}/${lid}`)
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
export const findListByIdWithMovieDetails = async (lid) => {
    let list = await findListById(lid);
    if (list) {
        list.movies = await Promise.all(list.movies.map(async mid => await movieServices.findMovieDetail(mid)));
    }
    return list;
}
export const deleteList = (lid) => {
    return api.delete(`${LIST_URL}/${lid}`)
        .then(response => response.data);
}
export const updateList = (uid, lid, movieList) => {
    return api.put(`${USER_URL}/${uid}/movie-lists/${lid}`, movieList)
        .then(response => response.data);
}