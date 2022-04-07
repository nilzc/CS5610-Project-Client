import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";

const HomeScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    return (
        <div>
            {loggedIn && "Show content for a logged-in user"}
            {!loggedIn && "Show content for an anonymous user"}
        </div>
    )
};
export default HomeScreen;