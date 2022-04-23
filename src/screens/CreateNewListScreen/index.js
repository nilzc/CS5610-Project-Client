import EditList from "../../components/EditList";
import * as listServices from "../../services/listServices";
import * as errorServices from "../../services/errorServices";
import {MY, MY_PROFILE_URL} from "../../services/utils";
import {useNavigate} from "react-router-dom";

const CreateNewListScreen = () => {
    const navigate = useNavigate();
    const submitHandler = (movieList) => {
        listServices.createList(MY, movieList)
            .then((response) => {
                navigate(MY_PROFILE_URL);
                alert("Movie list created!");
            }).catch(errorServices.alertError);
    }
    return (
        <EditList submitHandler={submitHandler}/>
    )
};
export default CreateNewListScreen;