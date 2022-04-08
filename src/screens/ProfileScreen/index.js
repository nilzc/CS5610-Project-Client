import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import {useEffect} from "react";

const ProfileScreen = () => {
    let params = useParams();
    const navigate = useNavigate();
    const profileOwnerId = params.uid;
    const loggedInUserId = useSelector(getUserId);
    const isThisMyProfile = () => {
        if (loggedInUserId === profileOwnerId) {
            navigate("/profile")
        }
    }
    useEffect(isThisMyProfile, [loggedInUserId, navigate, profileOwnerId]);
    return (
        <div>
            Profile of {params.uid ? params.uid : "me"}
        </div>
    )
};
export default ProfileScreen;