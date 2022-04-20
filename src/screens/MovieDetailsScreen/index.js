import {useNavigate, useParams} from "react-router-dom";
import * as movieServices from "../../services/movieServices";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import {useCallback, useEffect, useState} from "react";
import MovieItem from "../../components/MovieItem";
import MovieReviews from "../../components/MovieReviews";
import CreateReview from "../../components/CreateReview";
import MovieGallery from "../../components/MovieGallery";
import {resetScrollToTop} from "../../services/utils";

const MovieDetailsScreen = () => {
    let params = useParams();
    const movieId = params.mid;
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [reviews, setReviews] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const findRecommendations = useCallback(
        () => {
            movieServices.getRecommendationsByMovie(movieId, 1)
                .then(ms => setRecommendations(ms.slice(0, 5)))
                .catch(errorServices.alertError);
        }, [movieId]
    )
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
            resetScrollToTop();
            await findMovie();
            await findReviews();
            await findRecommendations();
        }, [findMovie, findRecommendations, findReviews]
    )
    useEffect(init, [init])
    return (
        <div className={"row d-flex justify-content-between m-3 p-2"}>
            <div className={"col-3 m-3 p-2"}>
                <MovieItem movie={movie} posterOnClickHandler={() => {}} addMovieOnClickHandler={() => {}}/>
            </div>
            <div className={"col-7 m-3 bg-light border"}>
                <div className={`m-3`}>
                    <h3 className={`text-primary`}>Reviews</h3>
                    <MovieReviews reviews={reviews} refresh={findReviews}/>
                </div>
                <div className={`m-3`}>
                    <h3 className={"text-primary mt-5"}>Add My Review</h3>
                    <CreateReview movieId={movieId} refresh={findReviews}/>
                </div>
            </div>
            {
                recommendations.length > 0 &&
                <div className={"col-12 p-4"}>
                    <h4 className={"text-primary m-1 p-1"}>You May Also Like:</h4>
                    <div className={"col-12 bg-light m-2 p-4 border"}>
                        <MovieGallery movies={recommendations} posterOnClickHandler={(movie) => navigate(`/movies/${movie.id}`)}/>
                    </div>
                </div>
            }
        </div>
    )
};
export default MovieDetailsScreen;