import {useDispatch, useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {logout} from "../../redux/actions";
import {Link} from "react-router-dom";

const NavigationBar = () => {
    const loggedIn = useSelector(isLoggedIn);
    const dispatch = useDispatch();
    const logoutButtonOnClick = () => {
        logout(dispatch)
            .then(() => alert("Logout successful!"))
            .catch(err => err.response.data.error)
    }
    return (
        <>
            We can have navigation bars here
            {loggedIn && <button className={"btn btn-warning"} onClick={logoutButtonOnClick}>Logout</button>}
            {!loggedIn &&
                <span>
                    <Link className={"btn btn-warning"} to={"/login"}>Login</Link>
                    <Link className={"btn btn-warning"} to={"/register"}>Register</Link>
                </span>}
        </>
    )
};
export default NavigationBar;