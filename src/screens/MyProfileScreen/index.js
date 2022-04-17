import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import * as authService from "../../services/authServices";
import ProfileOverview from "../../components/ProfileOverview";
import MovieList from "../../components/MovieList";
import * as listServices from "../../services/listServices";
import * as userServices from "../../services/userService";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import {MY} from "../../services/constants";
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
        <div>
            <h3>My Profile</h3>
            <div className={`d-flex fs-3`} align={`center`}>
                <Link className={`col-4`} to={""}>MyProfile</Link>
                <Link className={`col-4`} to={"s/lists"}>MyLists</Link>
                <Link className={`col-4`} to={"s/edit"}>Edit</Link>
            </div>
            <br/>
            <Routes>
                <Route index element={<ProfileOverview user={user} loggedIn={loggedIn}/>}/>
                <Route path={"s/lists"} element={<MovieList lists={movieLists} listItemOnClickHandler={(l) => {}}/>}/>
                <Route path={"s/edit"} element={<EditProfile user={user} inputOnChangeHandler={editInputOnChangeHandler} saveOnClickHandler={editSaveOnClickHandler}/>}/>
                <Route path={"s/reviews"} element={<MovieReviews reviews={reviews} refresh={findReviews}/>}/>
            </Routes>
        </div>
    )
};
export default MyProfileScreen;