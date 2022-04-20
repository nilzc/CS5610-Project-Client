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
            return {loggedIn: true, ...action.user};
        case LOG_OUT:
            return {loggedIn: false, username: null, userId: null, profile: {}};
        default:
            return state;
    }
}
export default userReducer;