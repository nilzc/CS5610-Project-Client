import {useSelector} from "react-redux";
import {getUserState, isLoggedIn} from "../../redux/selectors";
import {Routes, Route, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as authService from "../../services/authServices";
import ProfileOverview from "../../components/ProfileOverview";
import MovieList from "../../components/MovieList";
import * as listServices from "../../services/listServices";
import {MY} from "../../services/constants";

const MyProfileScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    const [user, setUser] = useState({});
    const [movieLists, setMovieLists] = useState([]);
    const navigate = useNavigate();
    const init = () => {
        if (!loggedIn) {
            navigate("/login");
            alert("Please login first!");
            return;
        }
        authService.profile().then((user) => {
            setUser(user);
            listServices.findAllListsOwnedByUser(MY).then(lists => setMovieLists(lists)).catch(e => alert(e.response.data.error));
        }).catch(e => alert(e.response.data.error));
    }
    useEffect(init, [loggedIn, navigate]);
    return (
        <div>
            My Profile
            <div>
                <Link to={""}>MyProfile</Link>
                <Link to={"s/lists"}>MyLists</Link>
            </div>
            <Routes>
                <Route index element={<ProfileOverview user={user}/>}/>
                <Route path={"s/lists"} element={<MovieList lists={movieLists}/>}/>
            </Routes>
        </div>
    )
};
export default MyProfileScreen;