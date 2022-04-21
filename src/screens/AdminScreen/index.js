import {useSelector} from "react-redux";
import {getProfile, isLoggedIn} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import {ADMIN} from "../../services/utils";
import {useCallback, useEffect, useState} from "react";
import * as userServices from "../../services/userService";
import * as errorServices from "../../services/errorServices";

const AdminScreen = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector(isLoggedIn);
    const profile = useSelector(getProfile);
    const [users, setUsers] = useState([]);
    const findUsers = () => {
        userServices.findAllUsers()
            .then(us => setUsers(us))
            .catch(errorServices.alertError);
    }
    const init = useCallback(
        () => {
            if (!loggedIn) {
                navigate("/login");
                alert("Please login first.");
                return;
            }
            if (profile.role !== ADMIN) {
                navigate("/home");
                alert("Only administrators are allowed.");
            }
            findUsers();
        }, [loggedIn, navigate, profile.role]
    )
    useEffect(init, [init]);
    return (
        <div className={"row"}>
            <h1 className={"col-12"}>
                Welcome Admin
            </h1>
            <div className={"col-12"}>
                <div className={"row"}>
                    <h3 className={"col-12"}>
                        User list:
                    </h3>
                    <div className={"col-6"}>
                        {
                            users.length > 0 &&
                            users.map((u, nth) => <div key={nth} className={"border bg-light p-2"}>{u.username}</div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};
export default AdminScreen;