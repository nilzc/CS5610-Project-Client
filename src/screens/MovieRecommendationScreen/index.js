import {useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import * as movieServices from "../../services/movieServices";
import * as errorServices from "../../services/errorServices";
import {INITIAL_PAGES} from "../../services/utils";
import MovieGallery from "../../components/MovieGallery";
import NoMoviesFound from "../../components/NoMoviesFound";
import Pagination from "../../components/Pagination";

const MovieRecommendationScreen = () => {
    const params = useParams();
    const movieId = params.mid;
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [pages, setPages] = useState(INITIAL_PAGES);
    const [currPage, setCurrPage] = useState(1);
    const [allowNextPages, setAllowNextPages] = useState(false);
    const findMovie = useCallback(
        () => {
            movieServices.findMovieDetail(movieId)
                .then((m) => setMovie(m))
                .catch(errorServices.alertError)
        }, [movieId]
    )
    const findRecommendations = useCallback(
        () => {
            movieServices.getRecommendationsByMovie(movieId, currPage)
                .then(ms => {
                    setRecommendations(ms.slice(0, 20));
                    setAllowNextPages(ms.length > 0)
                })
                .catch(errorServices.alertError);
        }, [currPage, movieId]
    )
    const findInfo = useCallback(
        async () => {
            await findMovie();
            await findRecommendations();
        }, [findMovie, findRecommendations]
    )
    useEffect(findInfo, [findInfo]);
    return (
        <div className={"m-4"}>
            <h1>Recommendations based on <span className={"fst-italic text-primary"}>{movie.title}</span></h1>
            <div className={"border bg-light p-3 mt-4"}>
                {
                    recommendations.length > 0 &&
                    <MovieGallery movies={recommendations} posterOnClickHandler={(movie) => navigate(`/movies/${movie.id}`)}/>
                }
                {
                    recommendations.length === 0 &&
                    <NoMoviesFound/>
                }
                <Pagination pages={pages} setPages={setPages} setCurrPage={setCurrPage} currPage={currPage} allowNextPages={allowNextPages}/>
            </div>
        </div>
    )
};
export default MovieRecommendationScreen;