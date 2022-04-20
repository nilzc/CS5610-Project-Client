import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {Link, Route, Routes, useNavigate, useLocation} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import * as authService from "../../services/authServices";
import ProfileOverview from "../../components/ProfileOverview";
import MovieList from "../../components/MovieList";
import * as listServices from "../../services/listServices";
import * as userServices from "../../services/userService";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import {MY} from "../../services/utils";
import EditProfile from "./EditProfile";
import MovieReviews from "../../components/MovieReviews";

const MyProfileScreen = ({navigation}) => {
    const loggedIn = useSelector(isLoggedIn);
    // declare all fields here to avoid undefined value
    const [user, setUser] = useState({
        username: "", firstName: "", lastName: "", phone: ""});
    const [movieLists, setMovieLists] = useState([]);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const editInputOnChangeHandler = (e, field) => {
        const tempUser = {...user};
        tempUser[field] = e.target.value;
        setUser(tempUser);
    }
    const editSaveOnClickHandler = (e) => {
        userServices.updateUser(MY, user)
            .then((response) => {
                navigate("/profile");
                alert("Profile updated!");
                findProfile();
        }).catch(err => alert(err.response.data.error));
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
        <div className={`m-3`}>
            <ul className="mt-4 mb-5 nav nav-pills nav-fill fs-4">
                <li className="nav-item">
                    <Link to=""
                          className={`nav-link w-75 ${(location.pathname.indexOf('lists') < 0 ) && (location.pathname.indexOf('edit') < 0 ) && (location.pathname.indexOf('reviews') < 0 ) ? 'active':''}`}>
                        My Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="s/lists"
                          className={`nav-link  w-75  ${location.pathname.indexOf('lists') >= 0 ? 'active':''}`}>
                        My Lists</Link>
                </li>
                <li className="nav-item">
                    <Link to="s/edit"
                          className={`nav-link w-75  ${location.pathname.indexOf('edit') >= 0 ? 'active':''}`}>
                        Edit Profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="s/reviews"
                          className={`nav-link w-75  ${location.pathname.indexOf('reviews') >= 0 ? 'active':''}`}>
                        My Reviews</Link>
                </li>
            </ul>
            <Routes>
                <Route index element={<ProfileOverview user={user} />}/>
                <Route path={"s/lists/*"} element={<MovieList lists={movieLists} />}/>
                <Route path={"s/edit"} element={<EditProfile user={user} inputOnChangeHandler={editInputOnChangeHandler} saveOnClickHandler={editSaveOnClickHandler}/>}/>
                <Route path={"s/reviews"} element={<MovieReviews reviews={reviews} refresh={findReviews}/>}/>
            </Routes>
        </div>
    )
};
export default MyProfileScreen;