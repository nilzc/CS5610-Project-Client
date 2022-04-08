import axios from "axios";

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