import {useNavigate, useParams} from "react-router-dom";
import * as movieServices from "../../services/movieServices";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import {useCallback, useEffect, useState} from "react";
import MovieItem from "../../components/MovieItem";
import MovieReviews from "../../components/MovieReviews";
import CreateReview from "../../components/CreateReview";
import MovieGallery from "../../components/MovieGallery";

const MovieDetailsScreen = () => {
    const params = useParams();
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
                .then(rs => setReviews(rs.slice(0,5)))
                .catch(errorServices.alertError)
        }, [movieId]
    )
    const findInfo = useCallback(
        async () => {
            await findMovie();
            await findReviews();
            await findRecommendations();
        }, [findMovie, findRecommendations, findReviews]
    )
    useEffect(findInfo, [findInfo])
    return (
        <div className={"row justify-content-between p-3"}>
            <div className={"col-3"}>
                {
                    movie &&
                    <MovieItem movieLikeBadge={true} movie={movie} posterOnClickHandler={() => {}}/>
                }
            </div>
            <div className="col-9 ps-4">
            <div className={"bg-light border p-2"}>
                <div className={'m-3'}>
                    <h3 className={`text-primary`}>Reviews</h3>
                    {
                        reviews.length > 0 &&
                        <MovieReviews reviews={reviews} refresh={findReviews}/>
                    }
                </div>
                <div className={'m-3'}>
                    <h3 className={"text-primary mt-5"}>Add My Review</h3>
                    <CreateReview movieId={movieId} refresh={findReviews}/>
                </div>
            </div>
            </div>
            {
                recommendations.length > 0 &&
                <div className={"col-12 mt-4"}>
                    <h4 className={"text-primary m-1 p-1"}>You May Also Like:</h4>
                    <div className={"col-12 bg-light m-2 p-4 border"}>
                        {
                            recommendations.length > 0 &&
                            <MovieGallery movies={recommendations} posterOnClickHandler={(movie) => navigate(`/movies/${movie.id}`)}/>
                        }
                    </div>
                </div>
            }
        </div>
    )
};
export default MovieDetailsScreen;