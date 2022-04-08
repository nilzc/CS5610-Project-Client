import {useSelector} from "react-redux";
import {getUserState, isLoggedIn} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as authService from "../../services/authServices";

const MyProfileScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const checkLogin = () => {
        if (!loggedIn) {
            navigate("/login");
            alert("Please login first!");
            return;
        }
        authService.profile()
            .then((user) => setUserInfo(user))
            .catch((err) => alert(err.response.data.error));
    }
    useEffect(checkLogin, [loggedIn, navigate]);
    return (
        <div>
            My Profile Including Private Information
            <div>Username: {userInfo.username}</div>
            <div>Phone (private): {userInfo.phone}</div>
        </div>
    )
};
export default MyProfileScreen;