import {useDispatch, useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import MovieSection from "./MovieSection";
import * as movieServices from "../../services/movieServices";
import * as errorServices from "../../services/errorServices";
import * as userServices from "../../services/userService";
import {useCallback, useEffect, useState} from "react";
import {refresh} from "../../redux/actions";
import {MY} from "../../services/utils";
import {Link, useNavigate} from "react-router-dom";
import UserLists from "../../components/UserLists";

const HomeScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [myLatestMovie, setMyLatestMovie] = useState({});
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
            try {
                const likedMovies = await movieServices.findAllMoviesLikedByUserWithMovieDetails(MY);
                if (likedMovies.length > 0) {
                    setMyLatestMovie(likedMovies[0])
                    const recommendMovies = await movieServices.getRecommendationsByMovie(likedMovies[0].id, 1).catch(alert);
                    setRecommendations(recommendMovies.slice(0, 5));
                }
            } catch (e) {
                errorServices.alertError(e, dispatch);
            }
        }, [dispatch]
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
            <div className={"row m-2 pt-5 pb-5 text-white rounded shadow"}
                 style={{backgroundImage: "linear-gradient(#213462, #213462),url('https://image.tmdb.org/t/p/w1280/yzpCv8CCWondN7O5au1KGiqnC3A.jpg')",
                     backgroundPositionX: "50%",
                     backgroundPositionY: "20%",
                     backgroundSize: "cover",
                     backgroundBlendMode: "saturation"
                 }}>
                <h1 className={"col-12 ps-5 pe-5 fw-bolder fs-1 mt-5"}>
                    Welcome!
                </h1>
                <h2 className={"col-12 ps-5 pe-5 fw-bolder fs-3 mb-5"}>
                    Millions of movies and people to discover. Explore now.
                </h2>
            </div>
            {
                loggedIn && recommendations && recommendations.length > 0 &&
                <>
                    <div className={"row align-items-end m-0"}>
                        <h3 className={`col text-black m-1 p-1 mt-3`}>
                            You liked <span className={"fst-italic fw-bold text-primary"}>{myLatestMovie.title}</span>, you may also like:
                        </h3>
                        <div className={"col-2 text-end pe-4"}>
                            <i role={"button"} className="fa-solid fa-ellipsis fs-3"
                               onClick={() => navigate(`/movies/${myLatestMovie.id}/recommendations`)}/>
                        </div>
                    </div>
                    <MovieSection movies={recommendations}/>
                </>
            }
            {
                loggedIn && recommendations && recommendations.length === 0 &&
                <>
                    <h3 className={`m-1 p-1 text-black mt-3`}>
                        You haven't liked any movie. Go explore!
                        <span className={"ps-3"}><Link to={"/movies/in/popular"} className={"btn btn-primary m-2"}>Take Me There</Link></span>
                    </h3>
                </>
            }
            <div className={"row m-0 align-items-end"}>
                <h3 className={`col text-primary m-1 p-1`}>Popular</h3>
                <div className={"col-2 text-end pe-4"}>
                    <i role={"button"} className="fa-solid fa-ellipsis text-primary fs-3"
                       onClick={() => navigate("/movies/in/popular")}/>
                </div>
            </div>
            {
                popularMovies.length > 0 &&
                <MovieSection movies={popularMovies}/>
            }
            <div className={"row m-0 align-items-end"}>
                <h3 className={`col text-primary m-1 p-1`}>Now Playing</h3>
                <div className={"col-2 text-end pe-4"}>
                    <i role={"button"} className="fa-solid fa-ellipsis text-primary fs-3"
                       onClick={() => navigate("/movies/in/now-playing")}/>
                </div>
            </div>
            {
                nowPlayingMovies.length > 0 &&
                <MovieSection movies={nowPlayingMovies}/>
            }
            <div className={"row m-0 align-items-end"}>
                <h3 className={`col text-primary m-1 p-1`}>Top Rated</h3>
                <div className={"col-2 text-end pe-4"}>
                    <i role={"button"} className="fa-solid fa-ellipsis text-primary fs-3"
                       onClick={() => navigate("/movies/in/top-rated")}/>
                </div>
            </div>
            {
                topRatedMovies.length > 0 &&
                <MovieSection movies={topRatedMovies}/>
            }
            <div className={"row m-0 align-items-end"}>
                <h3 className={`col text-primary m-1 p-1`}>Upcoming</h3>
                <div className={"col-2 text-end pe-4"}>
                    <i role={"button"} className="fa-solid fa-ellipsis text-primary fs-3"
                       onClick={() => navigate("/movies/in/upcoming")}/>
                </div>
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