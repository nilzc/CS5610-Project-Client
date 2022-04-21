import {useNavigate, useParams} from "react-router-dom";
import * as listServices from "../../services/listServices";
import * as errorServices from "../../services/errorServices";
import {useEffect, useState} from "react";
import EditList from "../../components/EditList";
import {MY} from "../../services/utils";

const EditListScreen = () => {
    const params = useParams();
    const listId = params.lid;
    const navigate = useNavigate();
    const [listDetails, setListDetails] = useState();
    const findListDetails = () => {
        listServices.findListByIdWithMovieDetails(listId)
            .then((l => setListDetails(l)))
            .catch(errorServices.alertError)
    }
    const submitHandler = (movieList) => {
        listServices.updateList(MY, listId, movieList)
            .then((response) => {
                navigate("/profile");
                alert("Movie list updated!");
            }).catch(errorServices.alertError);
    }
    useEffect(findListDetails, [listId]);
    return (
        <>
            {
                listDetails && <EditList currList={listDetails} submitHandler={submitHandler}/>
            }
        </>
    )
};
export default EditListScreen;