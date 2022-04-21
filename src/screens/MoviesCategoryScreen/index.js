import {useCallback, useEffect, useState} from "react";
import * as movieServices from "../../services/movieServices";
import * as errorServices from "../../services/errorServices";
import MovieGallery from "../../components/MovieGallery";
import {useNavigate, useParams} from "react-router-dom";
import Pagination from "../../components/Pagination";
import {INITIAL_PAGES} from "../../services/utils";

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
    const findPopularMovies = useCallback(
        () => {
            CATEGORY_ITEMS[category].func(currPage).then(ms => setMovies(ms)).catch(errorServices.alertError);
        }, [category, currPage]
    )
    useEffect(findPopularMovies, [findPopularMovies]);
    return (
        <div className={"m-4"}>
            <h1>{CATEGORY_ITEMS[category].title}</h1>
            {
                movies.length > 0 &&
                <div className={"border bg-light p-3"}>
                    {
                        movies.length > 0 &&
                        <MovieGallery movies={movies} posterOnClickHandler={(movie) => navigate(`/movies/${movie.id}`)}/>
                    }
                    {
                        movies.length === 0 &&
                        <div className={"fs-5 text-center"}>Sorry, no movies are found</div>
                    }
                    <Pagination pages={pages} setPages={setPages} setCurrPage={setCurrPage} currPage={currPage}/>
                </div>
            }
        </div>
    )
};
export default MoviesCategoryScreen;