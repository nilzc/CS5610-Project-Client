import {useDispatch, useSelector} from "react-redux";
import {getUserState} from "../../redux/selectors";
import React,{useState} from "react";
import {login} from "../../redux/actions";
import {useNavigate} from "react-router-dom";

const LoginScreen = () => {
    let [userCredential, setUserCredential] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginButtonOnClick = () => {
        login(dispatch, userCredential)
            .then(() => navigate("/home"))
            .catch(err => alert(err.response.data.error));
    }
    return (
        <div className="row d-flex justify-content-center align-items-center">
            <div className=" col-12 col-md-8 col-lg-6 col-xl-5 ">
                <h2 className="text-center">Login</h2>
                <div>
                    <label className="form-label" for="username">Username</label>
                    <input className="form-control" id="username" type="text"
                           onChange={(e) =>
                               setUserCredential({...userCredential, username: e.target.value})}
                           placeholder="username"/>
                </div>
                <div className="mt-4">
                    <label className="form-label" for="password">Password</label>
                <input className="form-control" id="password" type="password"
                       onChange={(e) =>
                           setUserCredential({...userCredential, password: e.target.value})}
                       placeholder="password"/>
                </div>

                <div>
                <button className="btn btn-primary mt-4" onClick={loginButtonOnClick}>Login</button>
                </div>
            </div>
        </div>
    )
};
export default LoginScreen;