import {Link, useNavigate, useParams} from "react-router-dom";
import * as listServices from "../../services/listServices";
import * as errorServices from "../../services/errorServices";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserId, isLoggedIn} from "../../redux/selectors";
import MovieItem from "../MovieItem";
import {MOVIE_DETAIL_URL} from "../../services/utils";

const ListDetails = ({profileUrl, allowAdd = true, allowDelete = true}) => {
    const dispatch = useDispatch();
    const loggedIn = useSelector(isLoggedIn);
    const loggedInUserId = useSelector(getUserId);
    const params = useParams();
    const navigate = useNavigate();
    const [listDetails, setListDetails] = useState({});
    const findListDetails = () => {
        listServices.findListByIdWithMovieDetails(params.lid)
            .then(ls => {
                if (ls) {
                    setListDetails(ls)
                } else {
                    navigate(`${profileUrl}/lists`)
                    alert("List does not exist!")
                }
            })
            .catch(errorServices.alertError);
    }
    const goBackClickHandler = () => {
        navigate(-1)
    }
    const posterOnClickHandler = (movie) => {
        navigate(`${MOVIE_DETAIL_URL}/${movie.id}`);
    }
    const deleteOnClickHandler = () => {
        listServices.deleteList(listDetails._id)
            .then((status) => {
                navigate(`${profileUrl}/lists`);
                alert("Movie list deleted!")
            })
            .catch((e) => errorServices.alertError(e, dispatch));
    }
    useEffect(findListDetails, [navigate, params.lid, profileUrl])
    return (
        <div className="row">
            <div className={"col-12 ps-3"}>
                <div className={"row align-items-center justify-content-between"}>
                    <div className={"col"}>
                        <div className="fs-4" onClick={goBackClickHandler}>
                            <i className="fas fa-angle-left"/>
                            <span className="ps-2">Go Back</span>
                        </div>
                    </div>
                    {
                        loggedIn && listDetails && listDetails.ownedBy && loggedInUserId === listDetails.ownedBy._id && allowAdd &&
                        <div className={"col-3 col-md-2 col-xxl-1 text-end"}>
                            <Link to={`/lists/${listDetails._id}`} className={"w-100 btn btn-primary"}>Add</Link>
                        </div>
                    }
                    {
                        loggedIn && listDetails && listDetails.ownedBy && loggedInUserId === listDetails.ownedBy._id && allowDelete &&
                        <div className={"col-4 col-md-2 col-xxl-1 text-end"}>
                            <button className={"w-100 btn btn-danger"} onClick={deleteOnClickHandler}>Delete</button>
                        </div>
                    }
                </div>
            </div>
            <div className={"col-12 mt-3"}>
                <div className={"row row-cols-2 row-cols-md-3 row-cols-lg-5 gy-3"}>
                    {
                        listDetails.movies && listDetails.movies.map((movie, nth) =>
                            <MovieItem key={nth} movie={movie} posterOnClickHandler={posterOnClickHandler}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
};
export default ListDetails;