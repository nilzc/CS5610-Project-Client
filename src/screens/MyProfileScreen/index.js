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

const MyProfileScreen = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector(isLoggedIn);
    const [user, setUser] = useState({username: "", firstName: "", lastName: "", phone: ""});
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
    const init = useCallback(
        () => {
            if (!loggedIn) {
                navigate("/login");
                return;
            }
            findProfile();
        }, [findProfile, loggedIn, navigate]
    )
    useEffect(init, [init]);
    return (
        <div className={"row m-3 justify-content-center"}>
            {
                user &&
                <ProfileImages profileOwner={user}/>
            }
            <div className="col-12 m-5 pt-3 ps-5 pe-5 nav-pills fs-4">
                <div className={"row gx-5"}>
                    <Link to=""
                          className={`col text-center nav-link ${(location.pathname.indexOf('lists') < 0 ) && (location.pathname.indexOf('edit') < 0 ) && (location.pathname.indexOf('reviews') < 0 ) ? 'active':''}`}>
                        My Profile</Link>
                    <Link to="s/lists"
                          className={`col text-center nav-link ${location.pathname.indexOf('lists') >= 0 ? 'active':''}`}>
                        My Lists</Link>
                    <Link to="s/edit"
                          className={`col text-center nav-link ${location.pathname.indexOf('edit') >= 0 ? 'active':''}`}>
                        Edit Profile</Link>
                    <Link to="s/reviews"
                          className={`col text-center nav-link ${location.pathname.indexOf('reviews') >= 0 ? 'active':''}`}>
                        My Reviews</Link>
                    <Link to="s/likes"
                          className={`col text-center nav-link ${location.pathname.indexOf('likes') >= 0 ? 'active':''}`}>
                        My Likes</Link>
                </div>
            </div>
            <Routes>
                <Route index element={<ProfileOverview profileOwner={user}/>}/>
                <Route path={"s/lists"} element={<MyLists/>}/>
                <Route path={"s/lists/:lid"} element={<MyListDetails/>}/>
                <Route path={"s/edit"} element={<EditProfile refresh={findProfile}/>}/>
                <Route path={"s/reviews"} element={<MyReviews/>}/>
                <Route path={"s/likes"} element={<MyLikes uid={user._id}/>}/>
            </Routes>
        </div>
    )
};
export default MyProfileScreen;