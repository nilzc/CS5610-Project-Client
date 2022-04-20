import {useSelector} from "react-redux";
import {getProfile, isLoggedIn} from "../../redux/selectors";
import {Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import * as authService from "../../services/authServices";
import ProfileOverview from "../../components/ProfileOverview";
import * as listServices from "../../services/listServices";
import * as userServices from "../../services/userService";
import * as cloudServices from "../../services/cloudinaryServices";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import {cloud, MY, UPLOAD_PRESET} from "../../services/utils";
import EditProfile from "./EditProfile";
import MovieReviews from "../../components/MovieReviews";
import MyLists from "./MyLists";
import MyListDetails from "./MyListDetails";
import "./style.css";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {max} from "@cloudinary/url-gen/actions/roundCorners";
import MyReviews from "./MyReviews";

const MyProfileScreen = ({navigation}) => {
    const loggedIn = useSelector(isLoggedIn);
    const [user, setUser] = useState({
        username: "", firstName: "", lastName: "", phone: ""});
    const [movieLists, setMovieLists] = useState([]);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const editFileUploadHandler = (e, field) => {
        if (e.target.files) {
            const tempUser = {...user}
            tempUser[field] = e.target.files[0];
            setUser(tempUser);
        }
    }
    const editInputOnChangeHandler = (e, field) => {
        const tempUser = {...user};
        tempUser[field] = e.target.value;
        setUser(tempUser);
    }
    const editSaveOnClickHandler = async (e) => {
        if (user.profilePhoto instanceof File) {
            const formData = new FormData();
            formData.append("file", user.profilePhoto);
            formData.append("upload_preset", UPLOAD_PRESET);
            const res = await cloudServices.uploadImage(formData).catch(alert);
            user.profilePhoto = res.public_id;
        }
        if (user.headerImage instanceof File) {
            const formData = new FormData();
            formData.append("file", user.headerImage);
            formData.append("upload_preset", UPLOAD_PRESET);
            const res = await cloudServices.uploadImage(formData).catch(alert);
            user.headerImage = res.public_id;
        }
        await userServices.updateUser(MY, user).catch(err => alert(err.response.data.error));
        navigate("/profile");
        alert("Profile updated!");
        await findProfile();
    }
    const findProfile = useCallback(
        () => {
            authService.profile().then((u) => {
                // remove password
                delete u["password"];
                setUser(u);
            }).catch(e => alert(e.response.data.error));
        }, []
    );
    const findLists = useCallback(
        () => {
            listServices.findAllListsOwnedByUserWithMovieDetails(MY)
                .then(lists => setMovieLists(lists))
                .catch(errorServices.alertError);
        }, []
    );
    const findReviews = useCallback(
        () => {
            reviewServices.findAllReviewsOwnedByUserWithMovieDetails(MY)
                .then(rs => setReviews(rs))
                .catch(errorServices.alertError);
        }, []
    )
    const init = useCallback(
        async () => {
            if (!loggedIn) {
                await navigation.navigate("/login");
                return;
            }
            await findProfile();
            await findLists();
            await findReviews();
        }, [findLists, findProfile, findReviews, loggedIn, navigation]
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
                <Route index element={<ProfileOverview user={user} />}/>
                <Route path={"s/lists"} element={<MyLists lists={movieLists}/>}/>
                <Route path={"s/lists/:lid"} element={<MyListDetails/>}/>
                <Route path={"s/edit"} element={<EditProfile user={user} inputOnChangeHandler={editInputOnChangeHandler} saveOnClickHandler={editSaveOnClickHandler} fileUploadHandler={editFileUploadHandler}/>}/>
                <Route path={"s/reviews"} element={<MyReviews reviews={reviews} refresh={findReviews}/>}/>
            </Routes>
        </div>
    )
};
export default MyProfileScreen;