import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import * as authService from "../../services/authServices";
import ProfileOverview from "../../components/ProfileOverview";
import * as errorServices from "../../services/errorServices";
import {cloud} from "../../services/utils";
import EditProfile from "./EditProfile";
import MyLists from "./MyLists";
import MyListDetails from "./MyListDetails";
import "./style.css";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {max} from "@cloudinary/url-gen/actions/roundCorners";
import MyReviews from "./MyReviews";

const MyProfileScreen = ({navigation}) => {
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
        <div className={`row m-3 justify-content-center`}>
            <div className={"col-12 header-image mb-5"}>
                <div className={"w-100 position-relative rounded shadow"}
                     style={{
                         backgroundImage: `url(${cloud.image(user.headerImage).toURL()})`,
                         backgroundSize: "cover", backgroundPosition: "center"
                     }}>
                    <img className={"position-absolute rounded-circle shadow border profile-photo"} src={cloud.image(user.profilePhoto).resize(fill(150, 150)).roundCorners(max()).toURL()} alt={"..."}/>
                </div>
            </div>
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
                </div>
            </div>
            <Routes>
                <Route index element={<ProfileOverview user={user}/>}/>
                <Route path={"s/lists"} element={<MyLists/>}/>
                <Route path={"s/lists/:lid"} element={<MyListDetails/>}/>
                <Route path={"s/edit"} element={<EditProfile refresh={findProfile}/>}/>
                <Route path={"s/reviews"} element={<MyReviews/>}/>
            </Routes>
        </div>
    )
};
export default MyProfileScreen;