import {fill} from "@cloudinary/url-gen/actions/resize";
import {max} from "@cloudinary/url-gen/actions/roundCorners";
import {cloud, goToUserProfile} from "../../services/utils";
import {useNavigate} from "react-router-dom";

const UserLists = ({users}) => {
    const navigate = useNavigate();
    return (
        <div className={"row row-cols-2 gy-3 m-1 p-1"}>
            {users.map((u, nth) =>
                <div key={nth} className={"col"}>
                    <div className={"row align-items-center"}>
                        <div className={"col-3 col-md-2"}>
                            <img role={"button"} className={"img-fluid"} onClick={() => goToUserProfile(navigate, u._id)}
                                 src={cloud.image(u.profilePhoto).resize(fill(150, 150)).roundCorners(max()).toURL()} alt={"..."}/>
                        </div>
                        <div className={"col-9 col-md-10 fs-4 fw-bold"}>
                            <span role={"button"} onClick={() => goToUserProfile(navigate, u._id)} className={"text-black"}>{u.username}</span>
                        </div>
                    </div>
                </div>)}
        </div>
    )
};
export default UserLists;