import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
const ProfileOverview = ({
                             user =
                                 {username: "Dummy", firstName: "Harry", lastName: "Potter", phone: ""}
                         }, ) => {
    const loggedIn = useSelector(isLoggedIn);

    return (
        <div align={`center`}>
            <div>
                <h3 className={`list-group m-2 col-3`} align={`left`}>Public:</h3>
                {user.username &&
                    <div className={`list-group-item fw-bold col-3 bg-light`}>Username:<span className={`fw-normal`}>  {user.username}</span></div>
                }
                {user.firstName &&
                    <div className={`list-group-item fw-bold col-3 bg-light`}>First Name:<span className={`fw-normal ps-1`}>  {user.firstName}</span></div>
                }
                {user.lastName &&
                    <div className={`list-group-item fw-bold col-3 bg-light`}>Last Name:<span className={`fw-normal ps-1`}>  {user.lastName}</span></div>
                }
            </div>
            <br/>
            {loggedIn && <div>
                <h3 className={`list-group m-2 col-3`} align = {`left`}>Private:</h3>
                {user.phone &&
                    <div className={`list-group-item fw-bold col-3 bg-light`}>Phone Number:<span className={`fw-normal ps-1`}>{user.phone}</span></div>
                }
            </div>}
        </div>

    )
};
export default ProfileOverview;