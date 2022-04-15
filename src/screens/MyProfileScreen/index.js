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
import * as movieServices from "../../services/movieServices";
import {MY} from "../../services/constants";
import EditProfile from "./EditProfile";
import MovieReviews from "../../components/MovieReviews";

const MyProfileScreen = () => {
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
            listServices.findAllListsOwnedByUser(MY)
                .then(lists => {
                    Promise.all(
                        lists.map(async l => {
                            l.movies = await Promise.all(l.movies.map(async mid => await movieServices.findMovieDetail(mid)));
                            return l;
                        })
                    ).then(ls => setMovieLists(ls));
                })
                .catch(e => alert(e.response.data.error))
        }, []
    );
    const findReviews = useCallback(
        () => {
            reviewServices.findAllReviewsOwnedByUser(MY)
                .then(rs => {
                    // find movie details and insert to reviews
                    Promise.all(
                        rs.map(async r => {
                            r.movie = await movieServices.findMovieDetail(r.movieId);
                            return r;
                        })
                    ).then(rs => setReviews(rs))
                })
                .catch(errorServices.alertError);
        }, []
    )
    const init = useCallback(
        async () => {
            if (!loggedIn) {
                navigate("/login");
                return;
            }
            await findProfile();
            await findLists();
            await findReviews();
        }, [findLists, findProfile, findReviews, loggedIn, navigate]
    )
    useEffect(init, [init]);
    return (
        <div>
            My Profile
            <div>
                <Link to={""}>MyProfile</Link>
                <Link to={"s/lists"} className={"ps-2"}>MyLists</Link>
                <Link to={"s/edit"} className={"ps-2"}>Edit</Link>
                <Link to={"s/reviews"} className={"ps-2"}>MyReviews</Link>
            </div>
            <Routes>
                <Route index element={<ProfileOverview user={user}/>}/>
                <Route path={"s/lists"} element={<MovieList lists={movieLists} listItemOnClickHandler={(l) => {}}/>}/>
                <Route path={"s/edit"} element={<EditProfile user={user} inputOnChangeHandler={editInputOnChangeHandler} saveOnClickHandler={editSaveOnClickHandler}/>}/>
                <Route path={"s/reviews"} element={<MovieReviews reviews={reviews} refresh={findReviews}/>}/>
            </Routes>
        </div>
    )
};
export default MyProfileScreen;