import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {register} from "../../redux/actions";

const RegisterScreen = () => {
    let [userCredential, setUserCredential] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerButtonOnClick = () => {
        register(dispatch, userCredential)
            .then(() => navigate("/home"))
            .catch(err => alert(err.response.data.error));
    }
    return (
        <div align={`center`} className={`m-3 p-2`}>
            <h3 className={`text-primary`}>Register</h3>
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

            <button className={"btn btn-primary m-3"} onClick={registerButtonOnClick}>Register</button>
        </div>
    )
};
export default RegisterScreen;