import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const USER_URL = `${BASE_URL}/api/users`;
const ADMIN_URL = `${BASE_URL}/api/admins`;
const SUPER_URL = `${BASE_URL}/api/supers`;

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
export const findAllAdmins = () => {
    return api.get(ADMIN_URL)
        .then(response => response.data);
}
export const createAdmin = (uname) => {
    return api.post((`${ADMIN_URL}/${uname}`))
        .then(response => response.data);
}
export const deleteAdmin = (uname) => {
    return api.delete((`${ADMIN_URL}/${uname}`))
        .then(response => response.data);
}
export const findAllSupers = () => {
    return api.get(SUPER_URL).then(response => response.data);
}
export const deleteUser = (uid) => {
    return api.delete(`${SUPER_URL}`)
}