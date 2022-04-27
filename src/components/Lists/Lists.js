import MovieListItem from "../MovieListItem";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import * as listServices from "../../services/listServices";
import * as errorServices from "../../services/errorServices";
import {MY} from "../../services/utils";


const Lists = ({uid}) => {
    const navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const listClickHandler = (list) => {
        navigate(`${list._id}`);
    }
    const findLists = useCallback(() => {
        if (uid) {
            listServices.findAllListsOwnedByUserWithMovieDetails(uid)
                .then(lists => setLists(lists))
                .catch(errorServices.alertError);
        }
    }, [uid]);

    useEffect(findLists, [findLists])
    return (
        <div className="row g-2">
            {lists && lists.map((l, nth) => <MovieListItem key={nth} list={l} onClickHandler={listClickHandler}/>)}
        </div>
    )
};
export default Lists;