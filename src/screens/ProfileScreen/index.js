import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import {useEffect, useState} from "react";
import * as userServices from "../../services/userService";
import ProfileOverview from "../../components/ProfileOverview";
import ProfileImages from "../../components/ProfileImages";

const ProfileScreen = () => {
    let params = useParams();
    const navigate = useNavigate();
    const profileOwnerId = params.uid;
    const loggedInUserId = useSelector(getUserId);
    const [profileOwner, setProfileOwner] = useState({});
    const init = () => {
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
    useEffect(init, [loggedInUserId, navigate, profileOwnerId]);
    return (
        <div className={"row m-3 justify-content-center"}>
            <ProfileImages profileOwner={profileOwner}/>
            <ProfileOverview profileOwner={profileOwner}/>
        </div>
    )
};
export default ProfileScreen;