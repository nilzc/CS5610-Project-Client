import {useDispatch, useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {logout} from "../../redux/actions";
import {useNavigate} from "react-router-dom";

const NavigationBar = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector(isLoggedIn);
    const dispatch = useDispatch();
    const logoutButtonOnClick = () => {
        logout(dispatch)
            .then(() => alert("Logout successful!"))
            .catch(err => err.response.data.error)
    }
    const loginButtonOnClick = () => {
        navigate("/login");
    }
    return (
        <>
            We can have navigation bars here
            {loggedIn && <button className={"btn btn-warning"} onClick={logoutButtonOnClick}>Logout</button>}
            {!loggedIn && <button className={"btn btn-warning"} onClick={loginButtonOnClick}>Login</button>}
        </>
    )
};
export default NavigationBar;