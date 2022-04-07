import {LOG_IN, LOG_OUT} from "../actionTypes";

const initialState = {
    loggedIn: false,
    username: null,
    userId: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            const {username, userId} = action.user;
            return {...state, loggedIn: true, username: username, userId: userId};
        case LOG_OUT:
            return {...state, loggedIn: false, username: null, userId: null};
        default:
            return state;
    }
}
export default userReducer;