import {LOG_IN, LOG_OUT} from "../actionTypes";

const initialState = {
    loggedIn: false,
    username: null,
    userId: null,
    profile: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {loggedIn: true, username: action.user.username, userId: action.user.userId, profile: action.user.profile};
        case LOG_OUT:
            return {loggedIn: false, username: null, userId: null, profile: {}};
        default:
            return state;
    }
}
export default userReducer;