import {useParams} from "react-router-dom";
import * as movieServices from "../../services/movieServices";
import * as reviewServices from "../../services/reviewServices";
import {useCallback, useEffect, useState} from "react";
import MovieItem from "../../components/MovieItem";
import MovieReviews from "../../components/MovieReviews";

const MovieDetailsScreen = () => {
    let params = useParams();
    const [movie, setMovie] = useState({});
    const [reviews, setReviews] = useState([]);
    const findMovie = useCallback(
        () => {
            movieServices.findMovieDetail(params.mid)
                .then((m) => setMovie(m))
                .catch(err => alert(err.response.data.error))
        }, [params.mid]
    )
    const findReviews = useCallback(
        () => {
            reviewServices.findAllReviewsOfMovie(params.mid)
                .then(reviews => setReviews(reviews))
                .catch(err => alert(err.response.data.error))
        }, [params.mid]
    )
    const init = useCallback(
        async () => {
            await findMovie();
            await findReviews();
        }, [findMovie, findReviews]
    )
    useEffect(init, [init])
    return (
        <div>
            Movie details page (change the content below with more detailed components):
            <MovieItem movie={movie} posterOnClickHandler={() => {}}/>
            {
                reviews &&
                <MovieReviews reviews={reviews}/>
            }
        </div>
    )
};
export default MovieDetailsScreen;