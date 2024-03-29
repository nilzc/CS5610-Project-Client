import MovieListItem from "../MovieListItem";
import {Link, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import * as listServices from "../../services/listServices";
import * as errorServices from "../../services/errorServices";
import {MY} from "../../services/utils";


const Lists = ({uid, allowCreate=false}) => {
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
        <div className="row row-cols-1 row-cols-lg-2 g-2 align-items-center">
            {lists && lists.map((l, nth) => <MovieListItem key={nth} list={l} onClickHandler={listClickHandler}/>)}
            {
                allowCreate &&
                <div className={"col-12 fs-4 text-center"}>
                    <Link to={"/lists/new"} className={"text-decoration-none"}>Create a new list <i className="fa-brands fa-golang fs-2"/></Link>
                </div>
            }
        </div>
    )
};
export default Lists;