import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import {useEffect, useState} from "react";
import * as userServices from "../../services/userService";

const ProfileScreen = () => {
    let params = useParams();
    const navigate = useNavigate();
    const profileOwnerId = params.uid;
    const loggedInUserId = useSelector(getUserId);
    const [profileOwner, setProfileOwner] = useState({});
    const isThisMyProfile = () => {
        if (loggedInUserId === profileOwnerId) {
            navigate("/profile")
            return;
        }
        userServices.findUserById(profileOwnerId)
            .then(user => setProfileOwner(user))
            .catch(err => alert(err.response.data.error))
    }
    useEffect(isThisMyProfile, [loggedInUserId, navigate, profileOwnerId]);
    return (
        <div>
            {profileOwner.username}'s Profile with Only Public Information
            <div>
                First Name: {profileOwner.firstName}
            </div>
            <div>
                Last Name: {profileOwner.lastName}
            </div>
            <div>
                Phone (private field is musked): {profileOwner.phone}
            </div>
        </div>
    )
};
export default ProfileScreen;