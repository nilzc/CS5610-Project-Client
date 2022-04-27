import {Link, Route, useNavigate, Routes, useParams, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUserId, isLoggedIn} from "../../redux/selectors";
import {useCallback, useEffect, useState} from "react";
import * as userServices from "../../services/userService";
import * as errorServices from "../../services/errorServices";
import ProfileOverview from "../../components/ProfileOverview";
import ProfileImages from "../../components/ProfileImages";
import Followings from "../../components/Followings";
import Followers from "../../components/Followers";
import {MY, PROFILE_URL} from "../../services/utils";
import ListDetails from "../../components/Lists/ListDetails";
import Reviews from "../../components/Reviews/Reviews";
import Likes from "../../components/Likes";
import Lists from "../../components/Lists/Lists";

const ProfileScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    const loggedInUserId = useSelector(getUserId);
    let params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const profileOwnerId = params.uid;
    const [followings, setFollowings] = useState([]);
    const [profileOwner, setProfileOwner] = useState({});
    const [followers, setFollowers] = useState([]);
    const [alreadyFollowed, setAlreadyFollowed] = useState(false);
    const isMe = loggedIn && loggedInUserId && loggedInUserId === profileOwnerId;
    const findUserAFollowsUserB = useCallback(
        () => {
            if (loggedIn) {
                userServices.userAAlreadyFollowsUserB(MY, profileOwnerId)
                    .then(res => setAlreadyFollowed(!!res))
                    .catch(errorServices.alertError);
            }
        }, [loggedIn, profileOwnerId]
    )
    const findFollowers = useCallback(
        () => {
            userServices.findAllFollowers(profileOwnerId)
                .then(us => setFollowers(us))
                .catch(errorServices.alertError);
        }, [profileOwnerId]
    )
    const follow = () => {
        if (!loggedIn) {
            alert("Please login first!");
            return;
        }
        userServices.userAFollowsUserB(MY, profileOwnerId)
            .then(init)
            .catch(errorServices.alertError);
    }
    const findFollowings = useCallback(
        () => {
            userServices.findAllFollowings(profileOwnerId)
                .then(us => setFollowings(us))
                .catch(errorServices.alertError);
        }, [profileOwnerId]
    )
    const findProfileOwner = useCallback(
        () => {
            userServices.findUserById(profileOwnerId)
                .then(user => {
                    if (user) {
                        setProfileOwner(user)
                    } else {
                        navigate("/home");
                        alert("Nonexistent user");
                    }
                })
                .catch(errorServices.alertError)
        }, [navigate, profileOwnerId]
    )
    const init = useCallback(
        async () => {
            if (profileOwnerId) {
                await findProfileOwner();
                await findFollowings();
                await findFollowers();
                await findUserAFollowsUserB();
            }
        }, [findFollowers, findFollowings, findProfileOwner, findUserAFollowsUserB, profileOwnerId]
    )
    useEffect(init, [init]);
    return (
        <div className={"row m-3 justify-content-center"}>
            <ProfileImages profileOwner={profileOwner}/>
            <div className={"col-12 fs-5"}>
                <div className={"row justify-content-end align-items-center"}>
                    <div className={"col-3"}>
                        <i className="fa-solid fa-address-card pe-2"/>
                        <span className={"fw-bold"}>{profileOwner.username}</span>'s Profile
                    </div>
                    <div className={"col-2 text-end"}>
                        <span className={"fw-bold pe-2"}>{profileOwner.stats && profileOwner.stats.following}</span>
                        <Link to={"followings"} className={"text-decoration-none text-black"}>Followings</Link>
                    </div>
                    <div className={"col-2 text-end"}>
                        <span className={"fw-bold pe-2"}>{profileOwner.stats && profileOwner.stats.follower}</span>
                        <Link to={"followers"} className={"text-decoration-none text-black"}>Followers</Link>
                    </div>
                    {
                        !isMe &&
                        <div className={"col-2 text-end"}>
                            {
                                !alreadyFollowed &&
                                <button className={"w-75 btn btn-dark rounded-pill"}
                                        onClick={follow}>Follow</button>
                            }
                            {
                                alreadyFollowed &&
                                <button className={"w-75 btn btn-outline-dark rounded-pill"}
                                        onClick={follow}>Unfollow</button>
                            }
                        </div>
                    }
                </div>
            </div>
            <div className="col-12 m-5 pt-3 ps-5 pe-5 nav-pills fs-4">
                <div className={"row gx-5"}>
                    <Link to=""
                          className={`col text-center nav-link ${location.pathname.match(/profile$/) ? "active" : ""}`}>
                        Profile</Link>
                    <Link to="lists"
                          className={`col text-center nav-link ${location.pathname.match(/profile\/lists/) ? "active" : ""}`}>
                        Lists</Link>
                    <Link to="reviews"
                          className={`col text-center nav-link ${location.pathname.match(/profile\/reviews/) ? "active" : ""}`}>
                        Reviews</Link>
                    <Link to="likes"
                          className={`col text-center nav-link ${location.pathname.match(/profile\/likes/) ? "active" : ""}`}>
                        Likes</Link>
                </div>
            </div>
            <Routes>
                <Route index element={<ProfileOverview profileOwner={profileOwner} showPrivate={false}/>}/>
                <Route path={"lists"} element={<Lists uid={profileOwner._id}/>}/>
                <Route path={"lists/:lid"} element={<ListDetails profileUrl={PROFILE_URL} allowAdd={false} allowDelete={false}/>}/>
                <Route path={"reviews"} element={<Reviews uid={profileOwner._id} allowDelete={false}/>}/>
                <Route path={"likes"} element={<Likes uid={profileOwner._id} allowLike={false} allowDelete={false}/>}/>
                <Route path={"followings"} element={<Followings baseUrl={`${PROFILE_URL}/${profileOwnerId}`} profileOwnerId={profileOwnerId} refresh={init} followings={followings}/>}/>
                <Route path={"followers"} element={<Followers baseUrl={`${PROFILE_URL}/${profileOwnerId}`} followers={followers}/>}/>
            </Routes>
        </div>
    )
};
export default ProfileScreen;