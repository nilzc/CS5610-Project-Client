import {useEffect, useState} from "react";
import * as userServices from "../../services/userService";
import * as errorServices from "../../services/errorServices";
import {getAvatar, goToUserProfile} from "../../services/utils";
import {Link, useNavigate} from "react-router-dom";

const Followers = ({baseUrl, followers}) => {
    const navigate = useNavigate();
    return (
        <div className={"row ps-5 pe-5"}>
            <div className={"col-12"}>
                <div className={"row row-cols-1 row-cols-sm-2 m-0"}>
                    <Link to={`${baseUrl}/followings`} className={"col btn btn-lg btn-light border"}>
                        Followings
                    </Link>
                    <Link to={`${baseUrl}/followers`} className={"col btn btn-lg btn-dark"}>
                        Followers
                    </Link>
                </div>
            </div>
            <div className={"col-12 mt-4"}>
                <div className={"list-group"}>
                    {
                        followers.length > 0 &&
                        followers.map((f, n) =>
                            <div key={n} className={"list-group-item p-4"}>
                                <div className={"row align-items-center justify-content-start"}>
                                    <div className={"col-6 col-md-2 col-lg-1"}>
                                        {f.followedBy && <img role={"button"} className={"img-fluid"} src={getAvatar(f.followedBy.profilePhoto)} alt={"..."}
                                                              onClick={() => goToUserProfile(navigate, f.followedBy._id)}/>}
                                    </div>
                                    <div className={"col-4"}>
                                        <span role={"button"} onClick={() => goToUserProfile(navigate, f.followedBy._id)}>{f.followedBy && f.followedBy.username}</span>
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
};
export default Followers;