import {useSelector} from "react-redux";
import {getUserId, isLoggedIn} from "../../redux/selectors";
import {getDate, PUBLIC_FIELDS} from "../../services/utils";
import {Fragment} from "react";
const ProfileOverview = ({
                             profileOwner =
                                 {username: "Dummy", firstName: "Harry", lastName: "Potter", phone: "", dateOfBirth: ""},
                             showPrivate=false
                         }) => {
    const loggedIn = useSelector(isLoggedIn);
    const loggedInUserId = useSelector(getUserId);
    return (
        <div className={"row justify-content-center"}>
            <div className={"col-12 col-md-6 col-lg-4"}>
                <div className={"row list-group"}>
                    <h4 className={"col-12 text-primary"}>Public:</h4>
                    {
                        PUBLIC_FIELDS.map((f, nth) =>
                            <Fragment key={nth}>
                                {
                                    profileOwner[f] &&
                                    <div className={"col-12 list-group-item bg-light"}>
                                        <div className={"row"}>
                                            <div className={`col-6 col-md-4 fw-bold`}>{f.charAt(0).toUpperCase() + f.slice(1)}:</div>
                                            <div className={"col-6 col-md-8"}>{profileOwner[f]}</div>
                                        </div>
                                    </div>
                                }
                            </Fragment>
                        )
                    }
                    {
                        loggedIn && loggedInUserId === profileOwner._id && showPrivate &&
                        <>
                            <h4 className={"text-primary mt-3"}>Private:</h4>
                            {profileOwner.email &&

                                <div className={"col-12 list-group-item bg-light"}>
                                    <div className={"row"}>
                                        <div className={`col-4 fw-bold`}>Email:</div>
                                        <div className={"col-8"}>{profileOwner.email}</div>
                                    </div>
                                </div>
                            }
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