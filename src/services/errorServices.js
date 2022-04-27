import {logout} from "../redux/actions";

export const alertError = (err, dispatch) => {
    if (err && err.response) {
        if (err.response.status === 401) {
            logout(dispatch).then(() => alert(err.response.data.error));
        } else {
            alert(err.response.data.error);
        }
    } else {
        alert(err);
    }
}