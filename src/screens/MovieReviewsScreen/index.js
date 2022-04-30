import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import * as movieServices from "../../services/movieServices";
import * as errorServices from "../../services/errorServices";
import * as reviewServices from "../../services/reviewServices";
import MovieItem from "../../components/MovieItem";
import MovieReviews from "../../components/MovieReviews";
import CreateReview from "../../components/CreateReview";

const MovieReviewsScreen = () => {
    const params = useParams();
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
                .then(rs => setReviews(rs))
                .catch(errorServices.alertError)
        }, [movieId]
    )
    const findInfo = useCallback(
        async () => {
            await findMovie();
            await findReviews();
        }, [findMovie, findReviews]
    )
    useEffect(findInfo, [findInfo])
    return (
        <div className={"row justify-content-between p-3"}>
            <div className={"col-8 col-md-6 col-lg-3"}>
                {
                    movie &&
                    <MovieItem allowLike={true} movie={movie} posterOnClickHandler={() => {}}/>
                }
            </div>
            <div className="col-12 col-lg-9 ps-4">
                <div className={"pt-4 pb-4"}>
                    <h3>Overview</h3>
                    <div className={"pt-2 pb-2 text-secondary"}>
                        {movie.overview}
                    </div>
                </div>
                <div className={"bg-light border p-2"}>
                    <div className={'m-3'}>
                        <div className={"row align-items-center"}>
                            <div className={"col"}>
                                <h3 className={`text-primary`}>Reviews</h3>
                            </div>
                        </div>
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
        </div>
    )
};
export default MovieReviewsScreen;