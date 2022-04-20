import {cloud, getAvatar} from "../../services/utils";
import "./style.css";

const ProfileImages = ({profileOwner}) => {
    return (
        <div className={"col-12 header-image mb-5"}>
            <div className={"w-100 position-relative rounded shadow"}
                 style={{
                     backgroundImage: `url(${cloud.image(profileOwner.headerImage).toURL()})`,
                     backgroundSize: "cover", backgroundPosition: "center"
                 }}>
                <img className={"position-absolute rounded-circle shadow border profile-photo"}
                     src={getAvatar(profileOwner.profilePhoto)} alt={"..."}/>
            </div>
        </div>
    )
};
export default ProfileImages;