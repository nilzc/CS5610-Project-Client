import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {getDate} from "../../services/utils";
const ProfileOverview = ({
                             profileOwner =
                                 {username: "Dummy", firstName: "Harry", lastName: "Potter", phone: "", dateOfBirth: ""}
                         }) => {
    const loggedIn = useSelector(isLoggedIn);
    return (
        <div className={"row justify-content-center"}>
            <div className={"col-4"}>
                <div className={"row list-group"}>
                    <h4 className={"col-12 text-primary"}>Public:</h4>
                    {profileOwner.username &&
                        <div className={"col-12 list-group-item bg-light"}>
                            <div className={"row"}>
                                <div className={`col-4 fw-bold`}>Username:</div>
                                <div className={"col-8"}>{profileOwner.username}</div>
                            </div>
                        </div>
                    }
                    {profileOwner.firstName &&
                        <div className={"col-12 list-group-item bg-light"}>
                            <div className={"row"}>
                                <div className={`col-4 fw-bold`}>First Name:</div>
                                <div className={"col-8"}>{profileOwner.firstName}</div>
                            </div>
                        </div>
                    }
                    {profileOwner.lastName &&
                        <div className={"col-12 list-group-item bg-light"}>
                            <div className={"row"}>
                                <div className={`col-4 fw-bold`}>Last Name:</div>
                                <div className={"col-8"}>{profileOwner.lastName}</div>
                            </div>
                        </div>
                    }
                    {
                        loggedIn &&
                        <>
                            <h4 className={"text-primary mt-3"}>Private:</h4>
                            {profileOwner.phone &&
                                <div className={"col-12 list-group-item bg-light"}>
                                    <div className={"row"}>
                                        <div className={`col-4 fw-bold`}>Phone:</div>
                                        <div className={"col-8"}>{profileOwner.phone}</div>
                                    </div>
                                </div>
                            }
                            {profileOwner.dateOfBirth &&
                                <div className={"col-12 list-group-item bg-light"}>
                                    <div className={"row"}>
                                        <div className={`col-4 fw-bold`}>Birthday:</div>
                                        <div className={"col-8"}>{profileOwner.dateOfBirth ? `${getDate(profileOwner.dateOfBirth)}` : "......"}</div>
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