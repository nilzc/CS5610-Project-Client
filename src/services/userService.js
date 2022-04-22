import axios from "axios";
import {responsive} from "@cloudinary/react";

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
export const findAllFollowings = (uid) => {
    return api.get(`${USER_URL}/${uid}/followings`)
        .then(response => response.data);
}
export const findAllFollowers = (uid) => {
    return api.get(`${USER_URL}/${uid}/followers`)
        .then(response => response.data);
}
export const userAFollowsUserB = (uidA, uidB) => {
    return api.post(`${USER_URL}/${uidA}/follows/${uidB}`)
        .then(response => response.data);
}
export const userAAlreadyFollowsUserB = (uidA, uidB) => {
    return api.get(`${USER_URL}/${uidA}/follows/${uidB}`)
        .then(response => response.data);
}