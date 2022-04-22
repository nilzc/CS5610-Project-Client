import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import * as authService from "../../services/authServices";
import ProfileOverview from "../../components/ProfileOverview";
import * as errorServices from "../../services/errorServices";
import EditProfile from "./EditProfile";
import MyLists from "./MyLists";
import MyListDetails from "./MyListDetails";
import MyReviews from "./MyReviews";
import ProfileImages from "../../components/ProfileImages";
import MyLikes from "../../components/MyLikes";
import Followings from "../../components/Followings";
import Followers from "../../components/Followers";
import {MY_PROFILE_URL} from "../../services/utils";
import * as userServices from "../../services/userService";

const MyProfileScreen = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector(isLoggedIn);
    const [user, setUser] = useState({username: "", firstName: "", lastName: "", phone: ""});
    const [followings, setFollowings] = useState([]);
    const [followers, setFollowers] = useState([]);
    const location = useLocation();
    const findProfile = useCallback(
        () => {
            authService.profile().then((u) => {
                // remove password
                delete u["password"];
                setUser(u);
            }).catch(errorServices.alertError);
        }, []
    );
    const findFollowers = useCallback(
        () => {
            userServices.findAllFollowers(user._id)
                .then(us => setFollowers(us))
                .catch(errorServices.alertError);
        }, [user._id]
    )
    const findFollowings = useCallback(
        () => {
            userServices.findAllFollowings(user._id)
                .then(us => setFollowings(us))
                .catch(errorServices.alertError);
        }, [user._id]
    )
    const init = useCallback(
        async () => {
            if (!loggedIn) {
                navigate("/login");
                return;
            }
            await findProfile();
            if (user._id) {
                await findFollowings();
                await findFollowers();
            }
        }, [findFollowers, findFollowings, findProfile, loggedIn, navigate, user._id]
    )
    useEffect(init, [init]);
    return (
        <div className={"row m-3 justify-content-center"}>
            {
                user &&
                <ProfileImages profileOwner={user}/>
            }
            <div className={"col-12 fs-5"}>
                <div className={"row justify-content-end"}>
                    <div className={"col-2"}>
                        <span className={"fw-bold pe-2"}>{user.stats && user.stats.following}</span>
                        <Link to={"followings"} className={"text-decoration-none text-black"}>Followings</Link>
                    </div>
                    <div className={"col-2"}>
                        <span className={"fw-bold pe-2"}>{user.stats && user.stats.follower}</span>
                        <Link to={"followers"} className={"text-decoration-none text-black"}>Followers</Link>
                    </div>
                </div>
            </div>
            <div className="col-12 m-5 pt-3 ps-5 pe-5 nav-pills fs-4">
                <div className={"row gx-5"}>
                    <Link to=""
                          className={`col text-center nav-link ${location.pathname.match(/my-profile$/) ? "active" : ""}`}>
                        My Profile</Link>
                    <Link to="lists"
                          className={`col text-center nav-link ${location.pathname.match(/my-profile\/lists/) ? "active" : ""}`}>
                        My Lists</Link>
                    <Link to="edit"
                          className={`col text-center nav-link ${location.pathname.match(/my-profile\/edit/) ? "active" : ""}`}>
                        Edit Profile</Link>
                    <Link to="reviews"
                          className={`col text-center nav-link ${location.pathname.match(/my-profile\/reviews/) ? "active" : ""}`}>
                        My Reviews</Link>
                    <Link to="likes"
                          className={`col text-center nav-link ${location.pathname.match(/my-profile\/likes/) ? "active" : ""}`}>
                        My Likes</Link>
                </div>
            </div>
            <Routes>
                <Route index element={<ProfileOverview profileOwner={user}/>}/>
                <Route path={"lists"} element={<MyLists/>}/>
                <Route path={"lists/:lid"} element={<MyListDetails/>}/>
                <Route path={"edit"} element={<EditProfile refresh={findProfile}/>}/>
                <Route path={"reviews"} element={<MyReviews/>}/>
                <Route path={"likes"} element={<MyLikes uid={user._id}/>}/>
                <Route path={"followings"} element={<Followings baseUrl={MY_PROFILE_URL} followings={followings} profileOwnerId={user._id} refresh={init}/>}/>
                <Route path={"followers"} element={<Followers baseUrl={MY_PROFILE_URL} followers={followers}/>}/>
            </Routes>
        </div>
    )
};
export default MyProfileScreen;