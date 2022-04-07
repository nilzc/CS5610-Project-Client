import {useSelector} from "react-redux";
import {getUserName, isLoggedIn} from "../../redux/selectors";

const HomeScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    const username = useSelector(getUserName);
    return (
        <div>
            {loggedIn && `Show content for a logged-in user: ${username}`}
            {!loggedIn && "Show content for an anonymous user"}
        </div>
    )
};
export default HomeScreen;