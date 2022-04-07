import {useSelector} from "react-redux";
import {getUserName, isLoggedIn} from "../../redux/selectors";
import MovieItem from "../../components/MovieItem";
import MovieGallery from "../../components/MovieGallery";

const HomeScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    const username = useSelector(getUserName);
    return (
        <div className={"col-12"}>
            {loggedIn && `Show content for a logged-in user: ${username}`}
            {!loggedIn && <MovieGallery/>}
        </div>
    )
};
export default HomeScreen;