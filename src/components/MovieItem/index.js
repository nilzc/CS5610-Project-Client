import {IMAGE_PLACEHOLDER, MY} from "../../services/utils";
import * as movieServices from "../../services/movieServices";
import * as errorServices from "../../services/errorServices";
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";

const MovieItem = ({
                       movie = {
                           title: "Spider-Man: No Way Home",
                           release_date: "2021-12-15",
                           poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
                       }, posterOnClickHandler, addMovieOnClickHandler, movieLikeBadge=false, refresh=() => {}
                   }) => {
    const loggedIn = useSelector(isLoggedIn);
    const [stats, setStats] = useState({});
    const [liked, setLiked] = useState(false);
    const posterPath =
        movie.poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342/${movie.poster_path}` : IMAGE_PLACEHOLDER;
    const findMovieStats = useCallback(
        () => {
            movieServices.findMovieStats(movie.id).then(s => {
                if (s) {
                    setStats(s.stats);
                }
            }).catch(errorServices.alertError);
        }, [movie.id]
    )
    const findIAlreadyLikedMovie = useCallback(
        () => {
            movieServices.findUserLikesMovie(MY, movie.id)
                .then(res => setLiked(!!res))
                .catch(errorServices.alertError);
        }, [movie.id]
    )
    const likeMovie = () => {
        if (!loggedIn) {
            alert("Please login first!");
            return;
        }
        if (movie && movie.id) {
            movieServices.userLikesMovie(MY, movie.id)
                .then(() => {
                    init();
                    refresh();
                })
                .catch(errorServices.alertError);
        }
    }
    const init = () => {
        if (movie && movie.id) {
            if (loggedIn) {
                findIAlreadyLikedMovie();
            } else {
                setLiked(false);
            }
            findMovieStats();
        }
    }
    useEffect(init, [findIAlreadyLikedMovie, findMovieStats, loggedIn, movie]);
    return (
        <div className={"col"}>
            <div className={"shadow position-relative"}>
                <div className={"overflow-hidden bg-black rounded-top"} style={{width: "100%", height: "0", paddingBottom: "150%"}}
                     onClick={() => posterOnClickHandler(movie)}>
                    <img className={"img-fluid"} src={posterPath} alt={"Poster Not Found"}/>
                </div>
                <div className={"p-2 ps-3 pe-3 rounded-bottom bg-white overflow-hidden"}>
                    <div style={{width: "100%", height: "0", paddingBottom: "60%"}}>
                        <div className={"fs-6 fw-bold"}>{movie.title}</div>
                        <div className={"fs-6 text-secondary"}>{movie.release_date}</div>
                    </div>
                </div>
                {
                    movieLikeBadge &&
                    <div className={"position-absolute badge rounded-pill bg-danger fs-6"} style={{top: "-0.5rem", right: "-1rem"}}
                         onClick={likeMovie}>
                        {
                            !liked &&
                            <i className={"fa-regular fa-heart"}/>
                        }
                        {
                            liked &&
                            <i className={"fa-solid fa-heart"}/>
                        }
                        {stats.likes > 0 && <span className={"ps-2"}>{stats.likes}</span>}
                    </div>
                }
                {
                    addMovieOnClickHandler &&
                    <div className={"row justify-content-center pb-3"}>
                        <button className={"col-8 btn btn-primary"} onClick={() => addMovieOnClickHandler(movie)}>Add Movie</button>
                    </div>
                }
            </div>
        </div>
    )
};
export default MovieItem;