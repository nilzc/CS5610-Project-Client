import {useSelector} from "react-redux";
import {getUserState, isLoggedIn} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const MyProfileScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    const loggedInUser = useSelector(getUserState);
    const navigate = useNavigate();
    const checkLogin = () => {
        if (!loggedIn) {
            alert("Please login first!")
            navigate("/login");
        }
    }
    useEffect(checkLogin);
    return (
        <div>
            My Profile:
            <div>UserID: {loggedInUser.userId}</div>
            <div>Username: {loggedInUser.username}</div>
        </div>
    )
};
export default MyProfileScreen;