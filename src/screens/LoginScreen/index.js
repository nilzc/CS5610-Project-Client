import {useDispatch, useSelector} from "react-redux";
import {getUserState} from "../../redux/selectors";
import {useState} from "react";
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
        <div align={`center`} className={`m-3 p-2`}>
            <h3 className={`text-primary`}>Login</h3>
            <div>
                <label className={"form-label fw-bold m-1"} align={`left`}>
                    Username:
                    <input className={"form-control m-1"} type={"text"}
                           onChange={(e) =>
                               setUserCredential({...userCredential, username: e.target.value})}/>
                </label>
            </div>
            <div>
                <label className={"form-label fw-bold m-1"} align={`left`}>
                    Password:
                    <input className={"form-control m-1"} type={"password"}
                           onChange={(e) =>
                               setUserCredential({...userCredential, password: e.target.value})}/>
                </label>
            </div>

            <button className={"btn btn-primary m-3"} onClick={loginButtonOnClick}>Login</button>
        </div>
    )
};
export default LoginScreen;