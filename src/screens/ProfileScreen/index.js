import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import {useEffect, useState} from "react";
import * as userServices from "../../services/userService";
import ProfileOverview from "../../components/ProfileOverview";

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
            .then(user => {
                if (user) {
                    setProfileOwner(user)
                } else {
                    navigate("/home");
                    alert("Nonexistent user");
                }
            })
            .catch(err => alert(err.response.data.error))
    }
    useEffect(isThisMyProfile, [loggedInUserId, navigate, profileOwnerId]);
    return (
        <div>
            {profileOwner.username && profileOwner.username}'s Profile
            <ProfileOverview user={profileOwner}/>
        </div>
    )
};
export default ProfileScreen;