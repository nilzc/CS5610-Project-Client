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
import MovieGallery from "../../components/MovieGallery";
import {Link, useNavigate} from "react-router-dom";
import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {max} from "@cloudinary/url-gen/actions/roundCorners";
import {colorize} from "@cloudinary/url-gen/actions/effect";
import {color} from "@cloudinary/url-gen/qualifiers/background";

const HomeScreen = () => {
    const cloud = new Cloudinary({cloud: {cloudName: 'cs5610-project'}});
    const loggedIn = useSelector(isLoggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [myLists, setMyLists] = useState([])
    const [recommendations, setRecommendations] = useState([]);
    const [myLatestMovie, setMyLatestMovie] = useState("");
    const findAllUsers = useCallback(
        async () => {
            const allUsers = await userServices.findAllUsers().catch(errorServices.alertError);
            setUsers([...allUsers]);
        }, []
    )
    const findMyLists = useCallback(
        async () => {
            const lists = await listServices.findAllListsOwnedByUserWithMovieDetails(MY).catch(alert);
            setMyLists(lists);
        }, []
    )
    const findRecommendations = useCallback(
        async () => {
            let latestMovie;
            for (const list of myLists) {
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
        }, [myLists]
    )
    const init = useCallback(
        async () => {
            await refresh(dispatch).catch(errorServices.alertError);
            if (loggedIn) {
                await findMyLists().catch(errorServices.alertError);
                await findRecommendations().catch(errorServices.alertError);
            }
            await findAllUsers().catch(errorServices.alertError);
        }, [dispatch, findAllUsers, findMyLists, findRecommendations, loggedIn]
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
                    <div className={"list-group-item bg-light m-2 p-4"}>
                        <MovieGallery movies={recommendations} posterOnClickHandler={(movie) => {navigate(`/movies/${movie.id}`);}}/>
                    </div>
                </>
            }
            {
                loggedIn && recommendations && recommendations.length === 0 &&
                <>
                    <h3 className={`m-1 p-1 text-primary mt-3`}>
                        Start your journey by creating a new list!
                        <span className={"ps-3"}><Link to={"/list/new"} className={"btn btn-primary"}>Take Me There</Link></span>
                    </h3>
                </>
            }
            <div className={"row m-0 align-items-end"}>
                <h3 className={`col text-primary m-1 p-1`}>Popular Movies</h3>
                <Link to={"/movies/popular"} className={"col text-end pe-4"}>
                    <i className="fa-solid fa-ellipsis text-primary fs-3"/>
                </Link>
            </div>
            <MovieSection  findMoviesFromServer={movieServices.findPopularMovies}/>
            <h3 className={`text-primary m-1 p-1`}>Now Playing</h3>
            <MovieSection findMoviesFromServer={movieServices.findNowPlayingMovies}/>
            <h3 className={`text-primary m-1 p-1`}> Top Rated</h3>
            <MovieSection findMoviesFromServer={movieServices.findTopRatedMovies}/>
            <h3 className={`text-primary m-1 p-1`}>Upcoming</h3>
            <MovieSection findMoviesFromServer={movieServices.findUpcomingMovies}/>
            <h3 className={`text-primary m-1 p-1`}>Active Users</h3>
            {
                users.length > 0 &&
                <div className={"row row-cols-2 gy-3 m-1 p-1"}>
                    {users.map((u, nth) =>
                        <div key={nth} className={"col"}>
                            <div className={"row align-items-center"}>
                                <div className={"col-2"}>
                                    <img className={"img-fluid"}
                                         src={cloud.image(u.profilePhoto).resize(fill(150, 150)).roundCorners(max()).toURL()}/>
                                </div>
                                <div className={"col-10 fs-4 fw-bold"}>
                                    {u.username}
                                </div>
                            </div>
                        </div>)}
                </div>
            }
        </div>
    )
};
export default HomeScreen;