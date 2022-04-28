import {useDispatch} from "react-redux";
import {useState} from "react";
import {login} from "../../redux/actions";
import {useNavigate} from "react-router-dom";
import {ADMIN, USER} from "../../services/utils";
import * as errorServices from "../../services/errorServices";

const LoginScreen = () => {
    let [userCredential, setUserCredential] = useState({});
    let [role, setRole] = useState(USER);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginButtonOnClick = () => {
        userCredential.role = role;
        login(dispatch, userCredential)
            .then(() => navigate(-1))
            .catch(errorServices.alertError);
    }
    return (
        <div className={`row m-3 p-2 justify-content-center`}>
            <div className={"col-12"}>
                <div className={"row justify-content-center"}>
                    <h1 className={`col-6 col-md-4 text-center text-primary`}>Login</h1>
                </div>
            </div>
            <div className={"col-12"}>
                <div className={"row justify-content-center"}>
                    <label className={"col-6 col-md-4 form-label fw-bold m-1"}>
                        Username:
                        <input className={"form-control m-1"} type={"text"}
                               onChange={(e) =>
                                   setUserCredential({...userCredential, username: e.target.value})}
                               placeholder="username"
                        />
                    </label>
                </div>
            </div>
            <div className={"col-12"}>
                <div className={"row justify-content-center"}>
                    <label className={"col-6 col-md-4 form-label fw-bold m-1"}>
                        Password:
                        <input className={"form-control m-1"} type={"password"}
                               onChange={(e) =>
                                   setUserCredential({...userCredential, password: e.target.value})}
                               placeholder="password"
                        />
                    </label>
                </div>
            </div>
            <div className={"col-12"}>
                <div className={"row justify-content-center"}>
                    <label className={"col-6 col-md-4 form-label fw-bold m-1"}>
                        Role:
                        <select defaultValue={"user"} className="form-select form-select-sm m-1" aria-label="Default select example"
                                onChange={(e) => setRole(e.target.value)}>
                            <option value="user">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="super">Super</option>
                        </select>
                    </label>
                </div>
            </div>
            <div className={"col-12"}>
                <div className={"row justify-content-center"}>
                    <button className={"col-4 col-md-2 btn btn-primary m-3"} onClick={loginButtonOnClick}>Login</button>
                </div>
            </div>
        </div>
    )
};
export default LoginScreen;