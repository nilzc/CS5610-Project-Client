import {useDispatch} from "react-redux";
import {useState} from "react";
import {login} from "../../redux/actions";
import {useNavigate} from "react-router-dom";
import {ADMIN, USER} from "../../services/utils";
import * as errorServices from "../../services/errorServices";

const LoginScreen = () => {
    let [userCredential, setUserCredential] = useState({});
    let [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginButtonOnClick = () => {
        userCredential.role = isAdmin ? ADMIN : USER;
        login(dispatch, userCredential)
            .then(() => navigate(-1))
            .catch(errorServices.alertError);
    }
    return (
        <div className={`row m-3 p-2 justify-content-center`}>
            <div className={"col-12"}>
                <div className={"row justify-content-center"}>
                    <h1 className={`col-4 text-center text-primary`}>Login</h1>
                </div>
            </div>
            <div className={"col-12"}>
                <div className={"row justify-content-center"}>
                    <label className={"col-4 form-label fw-bold m-1"}>
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
                    <label className={"col-4 form-label fw-bold m-1"}>
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
                    <div className={"col-4"}>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value={""} id="flexCheckDefault" checked={isAdmin}
                                   onChange={() => setIsAdmin(!isAdmin)}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Administrator
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"col-12"}>
                <div className={"row justify-content-center"}>
                    <button className={"col-2 btn btn-primary m-3"} onClick={loginButtonOnClick}>Login</button>
                </div>
            </div>
        </div>
    )
};
export default LoginScreen;