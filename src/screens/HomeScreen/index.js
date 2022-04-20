import {useDispatch, useSelector} from "react-redux";
import {getUserId, isLoggedIn} from "../../redux/selectors";
import MovieSection from "./MovieSection";
import * as movieServices from "../../services/movieServices";
import * as listServices from "../../services/listServices";
import * as errorServices from "../../services/errorServices";
import {useEffect, useState} from "react";
import {refresh} from "../../redux/actions";
import {MY} from "../../services/constants";
import MovieGallery from "../../components/MovieGallery";
import {Link, useNavigate} from "react-router-dom";

const HomeScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    const navigate = useNavigate();
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    const [myLists, setMyLists] = useState([])
    const [recommendations, setRecommendations] = useState([]);
    const [myLatestMovie, setMyLatestMovie] = useState("");
    const init = () => {
        refresh(dispatch).then(
            async () => {
                if (loggedIn) {
                    // get my lists
                    const lists = await listServices.findAllListsOwnedByUserWithMovieDetails(MY).catch(alert);
                    let latestMovie;
                    setMyLists(lists);
                    for (const list of lists) {
                        if (list.movies && list.movies.length > 0) {
                            latestMovie = list.movies[0].id;
                            setMyLatestMovie(list.movies[0].title);
                            break;
                        }
                    }
                    // get recommendations
                    if (latestMovie) {
                        const recommendMovies = await movieServices.getRecommendationsByMovie(latestMovie, 1).catch(alert);
                        setRecommendations(recommendMovies.slice(0, 5));
                    }
                }
            }
        ).catch(errorServices.alertError);
    }
    useEffect(init, [dispatch, loggedIn, userId])
    return (
        <div className={"col-12 list-group"}>
            {
                loggedIn && recommendations && recommendations.length > 0 &&
                <>
                    <h4 className={`text-primary m-1 p-1 mt-3`}>
                        You liked <span className={"fst-italic fw-bold"}>{myLatestMovie}</span>, you may also like:
                    </h4>
                    <div className={"list-group-item bg-light m-2 p-4"}>
                        <MovieGallery movies={recommendations} posterOnClickHandler={(movie) => {navigate(`/movies/${movie.id}`);}}/>
                    </div>
                </>
            }
            {
                loggedIn && recommendations && recommendations.length === 0 &&
                <>
                    <h4 className={`m-1 p-1 text-primary mt-3`}>
                        Start your journey by creating a new list!
                        <span className={"ps-3"}><Link to={"/list/new"} className={"btn btn-primary"}>Take Me There</Link></span>
                    </h4>
                </>
            }
            <div className={"row m-0 align-items-end"}>
                <h4 className={`col text-primary m-1 p-1`}>Popular Movies</h4>
                <Link to={"/movies/popular"} className={"col text-end pe-4"}>
                    <i className="fa-solid fa-ellipsis text-primary fs-3"/>
                </Link>
            </div>
            <MovieSection  findMoviesFromServer={movieServices.findPopularMovies}/>
            <div className={"row m-0 align-items-end"}>
                <h4 className={`col text-primary m-1 p-1`}>Now Playing</h4>
                <Link to={"/movies/nowplaying"} className={"col text-end pe-4"}>
                    <i className="fa-solid fa-ellipsis text-primary fs-3"/>
                </Link>
            </div>
            <MovieSection findMoviesFromServer={movieServices.findNowPlayingMovies}/>
            <h4 className={`text-primary m-1 p-1`}> Top Rated</h4>
            <MovieSection findMoviesFromServer={movieServices.findTopRatedMovies}/>
            <h4 className={`text-primary m-1 p-1`}>Upcoming</h4>
            <MovieSection findMoviesFromServer={movieServices.findUpcomingMovies}/>
        </div>
    )
};
export default HomeScreen;