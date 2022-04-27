import {useCallback, useEffect, useState} from "react";
import * as movieServices from "../../services/movieServices";
import * as errorServices from "../../services/errorServices";
import MovieGallery from "../../components/MovieGallery";
import {useNavigate, useParams} from "react-router-dom";
import Pagination from "../../components/Pagination";
import {INITIAL_PAGES, MOVIE_DETAIL_URL} from "../../services/utils";
import NoMoviesFound from "../../components/NoMoviesFound";

const CATEGORY_ITEMS = {
    "popular": {title: "Popular", func: movieServices.findPopularMovies},
    "top-rated": {title: "Top Rated", func: movieServices.findTopRatedMovies},
    "now-playing": {title: "Now Playing", func: movieServices.findNowPlayingMovies},
    "upcoming": {title: "Upcoming", func: movieServices.findUpcomingMovies}
}

const MoviesCategoryScreen = () => {
    const category = useParams().category;
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [pages, setPages] = useState(INITIAL_PAGES);
    const [currPage, setCurrPage] = useState(1);
    const [allowNextPages, setAllowNextPages] = useState(false);
    const findPopularMovies = useCallback(
        () => {
            CATEGORY_ITEMS[category].func(currPage)
                .then(ms => {
                    setMovies(ms);
                    setAllowNextPages(ms.length > 0);
                })
                .catch(errorServices.alertError);
        }, [category, currPage]
    )
    useEffect(findPopularMovies, [findPopularMovies]);
    return (
        <div className={"m-4"}>
            <h1>{CATEGORY_ITEMS[category].title}</h1>
            <div className={"border bg-light p-3 mt-4"}>
                {
                    movies.length > 0 &&
                    <MovieGallery movies={movies} posterOnClickHandler={(movie) => navigate(`${MOVIE_DETAIL_URL}/${movie.id}`)}/>
                }
                {
                    movies.length === 0 &&
                    <NoMoviesFound/>
                }
                <Pagination pages={pages} setPages={setPages} setCurrPage={setCurrPage} currPage={currPage} allowNextPages={allowNextPages}/>
            </div>
        </div>
    )
};
export default MoviesCategoryScreen;