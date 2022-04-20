import MovieListItem from "../../components/MovieListItem";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import * as listServices from "../../services/listServices";
import {MY} from "../../services/utils";
import * as errorServices from "../../services/errorServices";

const MyLists = () => {
    const navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const listClickHandler = (list) => {
        navigate(`${list._id}`);
    }
    const findLists = useCallback(
        () => {
            listServices.findAllListsOwnedByUserWithMovieDetails(MY)
                .then(lists => setLists(lists))
                .catch(errorServices.alertError);
        }, []
    );
    useEffect(findLists, [findLists])
    return (
        <div className="row g-2">
            {lists && lists.map((l, nth) => <MovieListItem key={nth} list={l} onClickHandler={listClickHandler}/>)}
        </div>
    )
};
export default MyLists;