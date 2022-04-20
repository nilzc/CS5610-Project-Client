import {useSelector} from "react-redux";
import {getProfile, isLoggedIn} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import {ADMIN} from "../../services/utils";
import {useCallback, useEffect} from "react";

const AdminScreen = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector(isLoggedIn);
    const profile = useSelector(getProfile);
    const init = useCallback(
        () => {
            if (!loggedIn) {
                navigate("/login");
                alert("Please login first.");
                return;
            }
            if (profile.role !== ADMIN) {
                navigate("/home");
                alert("Only administrators are allowed.");
            }
        }, [loggedIn, navigate, profile.role]
    )
    useEffect(init, [init]);
    return (
        <div>
            Admin
        </div>
    )
};
export default AdminScreen;