import {useParams} from "react-router-dom";
import * as movieServices from "../../services/movieServices";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import {useCallback, useEffect, useState} from "react";
import MovieItem from "../../components/MovieItem";
import MovieReviews from "../../components/MovieReviews";
import CreateReview from "../../components/CreateReview";

const MovieDetailsScreen = () => {
    let params = useParams();
    const movieId = params.mid;
    const [movie, setMovie] = useState({});
    const [reviews, setReviews] = useState([]);
    const findMovie = useCallback(
        () => {
            movieServices.findMovieDetail(movieId)
                .then((m) => setMovie(m))
                .catch(errorServices.alertError)
        }, [movieId]
    )
    const findReviews = useCallback(
        () => {
            reviewServices.findAllReviewsOfMovie(movieId)
                .then(reviews => setReviews(reviews))
                .catch(errorServices.alertError)
        }, [movieId]
    )
    const init = useCallback(
        async () => {
            await findMovie();
            await findReviews();
        }, [findMovie, findReviews]
    )
    useEffect(init, [init])
    return (
        <div className={"row d-flex justify-content-between m-3 p-2"}>
            <div className={"col-3 m-3 p-2"}>
                <MovieItem movie={movie} posterOnClickHandler={() => {}}/>
            </div>
            <div className={"col-7 m-3 bg-light"}>
                <div className={`m-3`}>
                    <h3 className={`text-primary`}>Reviews</h3>
                    <MovieReviews reviews={reviews} refresh={findReviews}/>
                </div>
                <div className={`m-3`}>
                    <h3 className={"text-primary mt-5"}>Add My Review</h3>
                    <CreateReview movieId={movieId} refresh={findReviews}/>
                </div>
            </div>
        </div>
    )
};
export default MovieDetailsScreen;