import {fill} from "@cloudinary/url-gen/actions/resize";
import {max} from "@cloudinary/url-gen/actions/roundCorners";
import {cloud} from "../../services/utils";
import {Link, useNavigate} from "react-router-dom";

const UserLists = ({users}) => {
    const navigate = useNavigate();
    return (
        <div className={"row row-cols-2 gy-3 m-1 p-1"}>
            {users.map((u, nth) =>
                <div key={nth} className={"col"}>
                    <div className={"row align-items-center"}>
                        <div className={"col-2"}>
                            <img className={"img-fluid"} onClick={() => {navigate(`/profile/${u._id}`)}}
                                 src={cloud.image(u.profilePhoto).resize(fill(150, 150)).roundCorners(max()).toURL()} alt={"..."}/>
                        </div>
                        <div className={"col-10 fs-4 fw-bold"}>
                            <Link to={`/profile/${u._id}`} className={"text-black"}>{u.username}</Link>
                        </div>
                    </div>
                </div>)}
        </div>
    )
};
export default UserLists;