import {useDispatch, useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import * as authService from "../../services/authServices";
import ProfileOverview from "../../components/ProfileOverview";
import * as errorServices from "../../services/errorServices";
import EditProfile from "./EditProfile";
import Lists from "../../components/Lists/Lists";
import ListDetails from "../../components/Lists/ListDetails";
import Reviews from "../../components/Reviews/Reviews";
import ProfileImages from "../../components/ProfileImages";
import Likes from "../../components/Likes";
import Followings from "../../components/Followings";
import Followers from "../../components/Followers";
import {MY_PROFILE_URL} from "../../services/utils";
import * as userServices from "../../services/userService";

const MyProfileScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
            }).catch((e) => errorServices.alertError(e, dispatch))
        }, [dispatch]
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
        () => {
            if (!loggedIn) {
                navigate("/login");
                return;
            }
            findProfile();
            if (user._id) {
                findFollowings();
                findFollowers();
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
                <div className={"row justify-content-end align-items-center"}>
                    <div className={"col-12 mt-4"}/>
                    <div className={"col-12 col-md-4 col-lg-3 text-end"}>
                        <i className="fa-solid fa-address-card pe-2"/>
                        <span className={"fw-bold"}>{user.username}</span>'s Profile
                    </div>
                    <div className={"col-6 col-md-3 col-lg-2 text-end"}>
                        <span className={"fw-bold pe-2"}>{user.stats && user.stats.following}</span>
                        <Link to={"followings"} className={"text-decoration-none text-black"}>Followings</Link>
                    </div>
                    <div className={"col-6 col-md-3 col-lg-2 text-end"}>
                        <span className={"fw-bold pe-2"}>{user.stats && user.stats.follower}</span>
                        <Link to={"followers"} className={"text-decoration-none text-black"}>Followers</Link>
                    </div>
                </div>
            </div>
            <div className="col-12 m-5 pt-3 ps-5 pe-5 nav-pills fs-4">
                <div className={"row row-cols-1 row-cols-md-3 row-cols-lg-5 gx-5 justify-content-center"}>
                    <Link to=""
                          className={`col text-center nav-link ${location.pathname.match(/profile\/my$/) ? "active" : ""}`}>
                        My Profile</Link>
                    <Link to="lists"
                          className={`col text-center nav-link ${location.pathname.match(/profile\/my\/lists/) ? "active" : ""}`}>
                        My Lists</Link>
                    <Link to="edit"
                          className={`col text-center nav-link ${location.pathname.match(/profile\/my\/edit/) ? "active" : ""}`}>
                        Edit Profile</Link>
                    <Link to="reviews"
                          className={`col text-center nav-link ${location.pathname.match(/profile\/my\/reviews/) ? "active" : ""}`}>
                        My Reviews</Link>
                    <Link to="likes"
                          className={`col text-center nav-link ${location.pathname.match(/profile\/my\/likes/) ? "active" : ""}`}>
                        My Likes</Link>
                </div>
            </div>
            <Routes>
                <Route index element={<ProfileOverview profileOwner={user} showPrivate={true}/>}/>
                <Route path={"lists"} element={<Lists uid={user._id} allowCreate={true}/>}/>
                <Route path={"lists/:lid"} element={<ListDetails profileUrl={MY_PROFILE_URL} />}/>
                <Route path={"edit"} element={<EditProfile refresh={findProfile}/>}/>
                <Route path={"reviews"} element={<Reviews uid={user._id} />}/>
                <Route path={"likes"} element={<Likes allowLike={true} uid={user._id} allowDelete={false}/> }/>
                <Route path={"followings"} element={<Followings baseUrl={MY_PROFILE_URL} followings={followings} profileOwnerId={user._id} refresh={init}/>}/>
                <Route path={"followers"} element={<Followers baseUrl={MY_PROFILE_URL} followers={followers}/>}/>
            </Routes>
        </div>
    )
};
export default MyProfileScreen;