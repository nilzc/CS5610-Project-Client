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
export const updateUser = (uid, updatedUser) => {
    return api.put(`${USER_URL}/${uid}`, updatedUser)
        .then(response => response.data);
}
export const findAllUsers = () => {
    return api.get(`${USER_URL}`)
        .then(response => response.data);
}