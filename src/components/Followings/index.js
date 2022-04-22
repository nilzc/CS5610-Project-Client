import * as userServices from "../../services/userService";
import * as errorServices from "../../services/errorServices";
import {getAvatar, goToUserProfile, MY} from "../../services/utils";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserId, isLoggedIn} from "../../redux/selectors";

const Followings = ({baseUrl, profileOwnerId, followings, refresh}) => {
    const navigate = useNavigate();
    const loggedIn = useSelector(isLoggedIn);
    const loggedInUserId = useSelector(getUserId);
    const unfollow = (uidB) => {
        userServices.userAFollowsUserB(MY, uidB)
            .then(refresh)
            .catch(errorServices.alertError);
    }
    return (
        <div className={"row ps-5 pe-5"}>
            <div className={"col-12"}>
                <div className={"row m-0"}>
                    <Link to={`${baseUrl}/followings`} className={"col-6 btn btn-lg btn-dark"}>
                        Followings
                    </Link>
                    <Link to={`${baseUrl}/followers`} className={"col-6 btn btn-lg btn-light border"}>
                        Followers
                    </Link>
                </div>
            </div>
            <div className={"col-12 mt-4"}>
                <div className={"list-group"}>
                    {
                        followings.length > 0 &&
                        followings.map((f, n) =>
                            <div key={n} className={"list-group-item p-4"}>
                                <div className={"row align-items-center justify-content-between"}>
                                    <div className={"col-1"}>
                                        {f.user && <img role={"button"} className={"img-fluid"} src={getAvatar(f.user.profilePhoto)} alt={"..."}
                                                        onClick={() => goToUserProfile(navigate, f.user._id)}/>}
                                    </div>
                                    <div className={"col-4"}>
                                        <span role={"button"} onClick={() => goToUserProfile(navigate, f.user._id)}>{f.user && f.user.username}</span>
                                    </div>
                                    <div className={"col"}/>
                                    <div className={"col-2"}>
                                        {
                                            loggedIn && loggedInUserId === profileOwnerId && f.user &&
                                            <button className={"btn rounded-pill btn-secondary"} onClick={() => unfollow(f.user._id)}>Unfollow</button>
                                        }
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
};
export default Followings;