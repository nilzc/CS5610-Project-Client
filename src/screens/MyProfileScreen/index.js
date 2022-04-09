import {useSelector} from "react-redux";
import {getUserState, isLoggedIn} from "../../redux/selectors";
import {Routes, Route, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as authService from "../../services/authServices";
import ProfileOverview from "../../components/ProfileOverview";
import MovieList from "../../components/MovieList";
import * as listServices from "../../services/listServices";
import * as userServices from "../../services/userService";
import {MY} from "../../services/constants";
import EditProfile from "./EditProfile";

const MyProfileScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    // declare all fields here to avoid undefined value
    const [user, setUser] = useState({
        username: "", firstName: "", lastName: "", phone: ""});
    const [movieLists, setMovieLists] = useState([]);
    const navigate = useNavigate();
    const refreshProfile = () => {
        authService.profile().then((u) => {
            // remove password
            delete u["password"];
            setUser(u);
            listServices.findAllListsOwnedByUser(MY).then(lists => setMovieLists(lists)).catch(e => alert(e.response.data.error));
        }).catch(e => alert(e.response.data.error));
    }
    const init = () => {
        if (!loggedIn) {
            navigate("/login");
            return;
        }
        refreshProfile();
    }
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
                refreshProfile();
        }).catch(err => alert(err.response.data.error));
    }
    useEffect(init, [loggedIn, navigate]);
    return (
        <div>
            My Profile
            <div>
                <Link to={""}>MyProfile</Link>
                <Link to={"s/lists"}>MyLists</Link>
                <Link to={"s/edit"}>Edit</Link>
            </div>
            <Routes>
                <Route index element={<ProfileOverview user={user}/>}/>
                <Route path={"s/lists"} element={<MovieList lists={movieLists} listItemOnClickHandler={(l) => {}}/>}/>
                <Route path={"s/edit"} element={<EditProfile user={user} inputOnChangeHandler={editInputOnChangeHandler} saveOnClickHandler={editSaveOnClickHandler}/>}/>
            </Routes>
        </div>
    )
};
export default MyProfileScreen;