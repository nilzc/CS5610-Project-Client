import {useSelector} from "react-redux";
import {getProfile, isLoggedIn} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import {SUPER, USER} from "../../services/utils";
import {useCallback, useEffect, useState} from "react";
import * as userServices from "../../services/userService";
import * as errorServices from "../../services/errorServices";

const AdminScreen = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector(isLoggedIn);
    const profile = useSelector(getProfile);
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [supers, setSupers] = useState([]);
    const findUsers = () => {
        userServices.findAllUsers()
            .then(us => setUsers(us))
            .catch(errorServices.alertError);
    }
    const findSupers = () => {
        userServices.findAllSupers()
            .then(s => setSupers(s))
            .catch(errorServices.alertError);
    }
    const findAdmins = () => {
        userServices.findAllAdmins()
            .then(as => setAdmins(as))
            .catch(errorServices.alertError);
    }
    const createAdmin = (uname) => {
        userServices.createAdmin(uname)
            .then(findAdmins)
            .catch(errorServices.alertError);
    }
    const deleteAdmin = (uname) => {
        userServices.deleteAdmin(uname)
            .then(findAdmins)
            .catch(errorServices.alertError)
    }
    const init = useCallback(
        () => {
            if (!loggedIn) {
                navigate("/login");
                alert("Please login first.");
                return;
            }
            if (profile.role === USER) {
                navigate("/home");
                alert("Only administrators are allowed.");
            }
            findUsers();
            findAdmins();
            findSupers();
        }, [loggedIn, navigate, profile.role]
    )
    useEffect(init, [init]);
    return (
        <div className={"row"}>
            <h1 className={"col-12"}>
                Welcome, {profile.username}
            </h1>
            <div className={"col-12"}>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <div className={"row m-0"}>
                            <h3 className={"col-12 p-2 ps-0"}>User list:</h3>
                            {
                                users.length > 0 &&
                                users.map((u, nth) =>
                                    <div key={nth} className={"col-12 border bg-light p-2 align-content-center"}>
                                        <div className={"row align-items-center justify-content-between"}>
                                            <div className={"col-4"}>
                                                Username: <span className={"fw-bold"}>{u.username}</span>
                                            </div>
                                            <div className={"col-4 text-end"}>
                                                {
                                                    profile.role === SUPER && admins.map(a => a.username).indexOf(u.username) < 0 &&
                                                    <button className={"btn btn-warning"}
                                                            onClick={() => createAdmin(u.username)}>Make Admin</button>
                                                }
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </div>
                    </div>
                    <div className={"col-6"}>
                        <h3 className={"col-12 p-2 ps-0"}>Admin list:</h3>
                        {
                            admins.length > 0 &&
                            admins.map((u, nth) =>
                                <div key={nth} className={"col-12 border bg-light p-2 align-content-center"}>
                                    <div className={"row align-items-center justify-content-between"}>
                                        <div className={"col-4"}>
                                            Username: <span className={"fw-bold"}>{u.username}</span>
                                        </div>
                                        <div className={"col-4 text-end"}>
                                            {
                                                profile.role === SUPER &&
                                                <button className={"btn btn-warning"}
                                                        onClick={() => deleteAdmin(u.username)}>Delete Admin</button>
                                            }
                                        </div>
                                    </div>
                                </div>)
                        }
                        <h3 className={"col-12 p-2 ps-0"}>Super list:</h3>
                        {
                            supers.length > 0 &&
                            supers.map((u, nth) =>
                                <div key={nth} className={"col-12 border bg-light p-2 align-content-center"}>
                                    <div className={"row align-items-center justify-content-between"}>
                                        <div className={"col-4"}>
                                            Username: <span className={"fw-bold"}>{u.username}</span>
                                        </div>
                                    </div>
                                </div>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};
export default AdminScreen;