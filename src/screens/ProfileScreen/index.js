import {useParams} from "react-router-dom";

const ProfileScreen = () => {
    let params = useParams();
    return (
        <div>
            Profile of {params.uid ? params.uid : "me"}
        </div>
    )
};
export default ProfileScreen;