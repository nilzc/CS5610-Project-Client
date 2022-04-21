import {useDispatch, useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import MovieSection from "./MovieSection";
import * as movieServices from "../../services/movieServices";
import * as listServices from "../../services/listServices";
import * as errorServices from "../../services/errorServices";
import * as userServices from "../../services/userService";
import {useCallback, useEffect, useState} from "react";
import {refresh} from "../../redux/actions";
import {MY} from "../../services/utils";
import {Link} from "react-router-dom";
import UserLists from "../../components/UserLists";

const HomeScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [myLists, setMyLists] = useState([])
    const [recommendations, setRecommendations] = useState([]);
    const [myLatestMovie, setMyLatestMovie] = useState("");
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const findMovies = useCallback(
        (func, setMovies) => {
            func(1).then((ms) => setMovies(ms.slice(0, 5)))
                .catch(errorServices.alertError);
        }, []
    )
    const findAllUsers = useCallback(
        async () => {
            const allUsers = await userServices.findAllUsers().catch(errorServices.alertError);
            setUsers(allUsers.slice(0, 8));
        }, []
    )
    const findRecommendations = useCallback(
        async () => {
            const lists = await listServices.findAllListsOwnedByUserWithMovieDetails(MY).catch(alert);
            setMyLists(lists);
            let latestMovie;
            for (const list of lists) {
                if (list.movies && list.movies.length > 0) {
                    latestMovie = list.movies[0].id;
                    setMyLatestMovie(list.movies[0].title);
                    break;
                }
            }
            if (latestMovie) {
                const recommendMovies = await movieServices.getRecommendationsByMovie(latestMovie, 1).catch(alert);
                setRecommendations(recommendMovies.slice(0, 5));
            }
        }, []
    )
    const init = useCallback(
        async () => {
            await refresh(dispatch).catch(errorServices.alertError);
            if (loggedIn) {
                await findRecommendations().catch(errorServices.alertError);
            }
            await findMovies(movieServices.findPopularMovies, setPopularMovies);
            await findMovies(movieServices.findTopRatedMovies, setTopRatedMovies);
            await findMovies(movieServices.findNowPlayingMovies, setNowPlayingMovies);
            await findMovies(movieServices.findUpcomingMovies, setUpcomingMovies);
            await findAllUsers().catch(errorServices.alertError);
        }, [dispatch, findAllUsers, findMovies, findRecommendations, loggedIn]
    )
    useEffect(init, [init])
    return (
        <div className={"col-12 list-group"}>
            {
                loggedIn && recommendations && recommendations.length > 0 &&
                <>
                    <h3 className={`text-primary m-1 p-1 mt-3`}>
                        You liked <span className={"fst-italic fw-bold"}>{myLatestMovie}</span>, you may also like:
                    </h3>
                    <MovieSection movies={recommendations}/>
                </>
            }
            {
                loggedIn && recommendations && recommendations.length === 0 &&
                <>
                    <h3 className={`m-1 p-1 text-primary mt-3`}>
                        Start your journey by creating a new list!
                        <span className={"ps-3"}><Link to={"/lists/new"} className={"btn btn-primary"}>Take Me There</Link></span>
                    </h3>
                </>
            }
            <div className={"row m-0 align-items-end"}>
                <h3 className={`col text-primary m-1 p-1`}>Popular Movies</h3>
                <Link to={"/movies/in/popular"} className={"col text-end pe-4"}>
                    <i className="fa-solid fa-ellipsis text-primary fs-3"/>
                </Link>
            </div>
            {
                popularMovies.length > 0 &&
                <MovieSection movies={popularMovies}/>
            }
            <div className={"row m-0 align-items-end"}>
                <h3 className={`col text-primary m-1 p-1`}>Now Playing</h3>
                <Link to={"/movies/in/now-playing"} className={"col text-end pe-4"}>
                    <i className="fa-solid fa-ellipsis text-primary fs-3"/>
                </Link>
            </div>
            {
                nowPlayingMovies.length > 0 &&
                <MovieSection movies={nowPlayingMovies}/>
            }
            <div className={"row m-0 align-items-end"}>
                <h3 className={`col text-primary m-1 p-1`}>Top Rated</h3>
                <Link to={"/movies/in/top-rated"} className={"col text-end pe-4"}>
                    <i className="fa-solid fa-ellipsis text-primary fs-3"/>
                </Link>
            </div>
            {
                topRatedMovies.length > 0 &&
                <MovieSection movies={topRatedMovies}/>
            }
            <div className={"row m-0 align-items-end"}>
                <h3 className={`col text-primary m-1 p-1`}>Upcoming Movies</h3>
                <Link to={"/movies/in/upcoming"} className={"col text-end pe-4"}>
                    <i className="fa-solid fa-ellipsis text-primary fs-3"/>
                </Link>
            </div>
            {
                upcomingMovies.length > 0 &&
                <MovieSection movies={upcomingMovies}/>
            }
            <h3 className={`text-primary m-1 p-1`}>Active Users</h3>
            {
                users.length > 0 &&
                <UserLists users={users}/>
            }
        </div>
    )
};
export default HomeScreen;