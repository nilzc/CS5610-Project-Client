import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {getDate} from "../../services/utils";
const ProfileOverview = ({
                             user =
                                 {username: "Dummy", firstName: "Harry", lastName: "Potter", phone: "", dateOfBirth: ""}
                         }) => {
    const loggedIn = useSelector(isLoggedIn);

    return (
        <div className={"row justify-content-center"}>
            <div className={"col-4"}>
                <div className={"row list-group"}>
                    <h4 className={"col-12 text-primary"}>Public:</h4>
                    {user.username &&
                        <div className={"col-12 list-group-item bg-light"}>
                            <div className={"row"}>
                                <div className={`col-4 fw-bold`}>Username:</div>
                                <div className={"col-8"}>{user.username}</div>
                            </div>
                        </div>
                    }
                    {user.firstName &&
                        <div className={"col-12 list-group-item bg-light"}>
                            <div className={"row"}>
                                <div className={`col-4 fw-bold`}>First Name:</div>
                                <div className={"col-8"}>{user.firstName}</div>
                            </div>
                        </div>
                    }
                    {user.lastName &&
                        <div className={"col-12 list-group-item bg-light"}>
                            <div className={"row"}>
                                <div className={`col-4 fw-bold`}>Last Name:</div>
                                <div className={"col-8"}>{user.lastName}</div>
                            </div>
                        </div>
                    }
                    {
                        loggedIn &&
                        <>
                            <h4 className={"text-primary mt-3"}>Private:</h4>
                            {user.phone &&
                                <div className={"col-12 list-group-item bg-light"}>
                                    <div className={"row"}>
                                        <div className={`col-4 fw-bold`}>Phone:</div>
                                        <div className={"col-8"}>{user.phone}</div>
                                    </div>
                                </div>
                            }
                            {user.dateOfBirth &&
                                <div className={"col-12 list-group-item bg-light"}>
                                    <div className={"row"}>
                                        <div className={`col-4 fw-bold`}>Data of Birth:</div>
                                        <div className={"col-8"}>{user.dateOfBirth ? `${getDate(user.dateOfBirth)}` : "......"}</div>
                                    </div>
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
};
export default ProfileOverview;