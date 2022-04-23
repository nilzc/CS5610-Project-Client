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
    const [credits, setCredits] = useState({});
    const [reviews, setReviews] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const findMovieCredits = useCallback(
        () => {
            movieServices.findMovieCredits(movieId)
                .then(c => setCredits(c))
                .catch(errorServices.alertError);
        }, [movieId]
    )
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
                .then(rs => setReviews(rs.slice(0,3)))
                .catch(errorServices.alertError)
        }, [movieId]
    )
    const findInfo = useCallback(
        async () => {
            await findMovie();
            await findMovieCredits();
            await findReviews();
            await findRecommendations();
        }, [findMovie, findMovieCredits, findRecommendations, findReviews]
    )
    const goToMovieReviews = () => {
        navigate(`/movies/${movieId}/reviews`);
    }
    const goToRecommendations = () => {
        navigate(`/movies/${movieId}/recommendations`);
    }
    const sortCrewMemberByPopularity = (crew) => {
        crew = crew.sort((a, b) => b.popularity - a.popularity)
        crew = [...new Set(crew.map(c => c.name))]
        return crew.slice(0, 20);
    }
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
                <div className={"pt-4 pb-4"}>
                    <h3>Overview</h3>
                    <div className={"pt-2 pb-2 text-secondary"}>
                        {movie.overview}
                    </div>
                </div>
                <div className={"pb-4"}>
                    <h3>Cast</h3>
                    <div className={"pt-2 pb-2 text-secondary d-flex align-items-center"} style={{overflowX: "auto", whiteSpace: "nowrap"}}>
                        {
                            credits.cast &&
                            credits.cast.slice(0, 20).map((c, nth) => <div key={nth} className={"pe-4 fs-6"}>{c.name} </div>)
                        }
                    </div>
                </div>
                <div className={"pb-4"}>
                    <h3>Crew</h3>
                    <div className={"pt-2 pb-2 text-secondary d-flex align-items-center"} style={{overflowX: "auto", whiteSpace: "nowrap"}}>
                        {
                            credits.crew &&
                            sortCrewMemberByPopularity(credits.crew).map((c, nth) => <div key={nth} className={"pe-4 fs-6"}>{c} </div>)
                        }
                    </div>
                </div>
                <div className={"bg-light border p-2"}>
                    <div className={'m-3'}>
                        <div className={"row align-items-center"}>
                            <div className={"col"}>
                                <h3 className={`text-primary`}>Reviews</h3>
                            </div>
                            <div className={"col-1 text-end pe-3"}>
                                <i role={"button"} className="fa-solid fa-ellipsis text-primary fs-3"
                                   onClick={goToMovieReviews}/>
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
            {
                recommendations.length > 0 &&
                <div className={"col-12 mt-4"}>
                    <div className={"row align-items-center"}>
                        <div className={"col"}>
                            <h4 className={"text-primary m-1 p-1"}>You May Also Like:</h4>
                        </div>
                        <div className={"col-1 text-end"}>
                            <i role={"button"} className="fa-solid fa-ellipsis text-primary fs-3"
                               onClick={goToRecommendations}/>
                        </div>
                    </div>
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