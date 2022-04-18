import {useDispatch, useSelector} from "react-redux";
import {getUserId, getUserName, isLoggedIn} from "../../redux/selectors";
import MovieSection from "./MovieSection";
import * as movieServices from "../../services/movieServices";
import * as listServices from "../../services/listServices";
import * as errorServices from "../../services/errorServices";
import {useEffect, useState} from "react";
import {refresh} from "../../redux/actions";
import {MY} from "../../services/constants";
import MovieGallery from "../../components/MovieGallery";
import {useNavigate} from "react-router-dom";

const HomeScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    const navigate = useNavigate();
    const username = useSelector(getUserName);
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
                        setRecommendations(recommendMovies.slice(0, 4));
                    }
                }
            }
        ).catch(errorServices.alertError);
    }
    useEffect(init, [dispatch, loggedIn, userId])
    return (
        <div className={"col-12 list-group "} align={`;eft`}>
            {
                recommendations &&
                <div className={`m-1 p1 text-primary`}>
                    You liked {myLatestMovie}, you may also like:
                    <MovieGallery movies={recommendations} posterOnClickHandler={(movie) => {navigate(`/details/${movie.id}`);}}/>
                </div>
            }
            <h4 className={`text-primary m-1 p-1`}>Popular Movies</h4>
            <MovieSection  findMoviesFromServer={movieServices.findPopularMovies}/>
            <h4 className={`text-primary m-1 p-1`}>Now Playing</h4>
            <MovieSection findMoviesFromServer={movieServices.findNowPlayingMovies}/>
            <h4 className={`text-primary m-1 p-1`}> Top Rated</h4>
            <MovieSection findMoviesFromServer={movieServices.findTopRatedMovies}/>
            <h4 className={`text-primary m-1 p-1`}>Upcoming</h4>
            <MovieSection findMoviesFromServer={movieServices.findUpcomingMovies}/>
        </div>
    )
};
export default HomeScreen;