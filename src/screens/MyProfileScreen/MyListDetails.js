import {useNavigate, useParams} from "react-router-dom";
import * as listServices from "../../services/listServices";
import * as errorServices from "../../services/errorServices";
import {useEffect, useState} from "react";
import MovieGallery from "../../components/MovieGallery";

const MyListDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [listDetails, setListDetails] = useState({});
    const findListDetails = () => {
        listServices.findListByIdWithMovieDetails(params.lid)
            .then(ls => setListDetails(ls))
            .catch(errorServices.alertError);
    }
    const goBackClickHandler = () => {
        navigate("/profile/s/lists")
    }
    const posterOnClickHandler = (movie) => {
        navigate('/movies/'+ movie.id)
    }
    useEffect(findListDetails, [params.lid])
    return (
        <div className="row g-2 mt-4 mb-4">
            <div className="fs-4 m-3" onClick={goBackClickHandler}>
                <i className="fas fa-angle-left"/>
                <span className="align-items-center ps-2">Go Back</span></div>
            <MovieGallery movies={listDetails.movies} posterOnClickHandler={posterOnClickHandler}/>
        </div>
    )
};
export default MyListDetails;