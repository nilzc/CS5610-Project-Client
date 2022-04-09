import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USER_URL = `${BASE_URL}/api/users`

const api = axios.create({
    withCredentials: true
});

export const findUserById = (uid) => {
    return api.get(`${USER_URL}/${uid}`)
        .then(response => response.data);
}