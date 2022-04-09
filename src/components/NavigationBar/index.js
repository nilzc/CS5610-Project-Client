import {useDispatch, useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {logout} from "../../redux/actions";
import {Link, useNavigate} from "react-router-dom";

const NavigationBar = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector(isLoggedIn);
    const dispatch = useDispatch();
    const logoutButtonOnClick = () => {
        logout(dispatch)
            .then(() => {
                navigate("/home");
                alert("Logout successful!");
            })
            .catch(err => err.response.data.error)
    }
    return (
        <>
            <Link className={"btn btn-primary"} to={"/home"}>Home</Link>
            We can have navigation bars here
            {loggedIn &&
                <span>
                    <button className={"btn btn-warning"} onClick={logoutButtonOnClick}>Logout</button>
                    <Link className={"btn btn-primary"} to={"/profile"}>Profile</Link>
                    <Link className={"btn btn-primary"} to={"/list/new"}>Create List</Link>
                </span>}
            {!loggedIn &&
                <span>
                    <Link className={"btn btn-primary"} to={"/login"}>Login</Link>
                    <Link className={"btn btn-primary"} to={"/register"}>Register</Link>
                </span>}
        </>
    )
};
export default NavigationBar;