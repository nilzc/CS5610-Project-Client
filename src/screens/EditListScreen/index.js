import {useNavigate, useParams} from "react-router-dom";
import * as listServices from "../../services/listServices";
import * as errorServices from "../../services/errorServices";
import {useEffect, useState} from "react";
import EditList from "../../components/EditList";
import {MY, MY_PROFILE_URL} from "../../services/utils";
import {useDispatch} from "react-redux";

const EditListScreen = () => {
    const params = useParams();
    const dispatch = useDispatch();
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
                navigate(MY_PROFILE_URL);
                alert("Movie list updated!");
            }).catch((e) => errorServices.alertError(e, dispatch));
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