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
        <div className={"row m-3 p-2"}>
            <div className={"col-12"}>
                <div className={"row justify-content-center"}>
                    <h1 className={`col-4 text-primary text-center`}>Register</h1>
                </div>
            </div>
            <div className={"col-12"}>
                <div className={"row justify-content-center"}>
                    <label className={"col-4 form-label fw-bold m-1"} align={`left`}>
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
                    <label className={"col-4 form-label fw-bold m-1"} align={`left`}>
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
                    <button className={"col-2 btn btn-primary m-3"} onClick={registerButtonOnClick}>Register</button>
                </div>
            </div>


        </div>
    )
};
export default RegisterScreen;