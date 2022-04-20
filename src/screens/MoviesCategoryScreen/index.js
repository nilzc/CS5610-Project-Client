import {useCallback, useEffect, useState} from "react";
import * as movieServices from "../../services/movieServices";
import * as errorServices from "../../services/errorServices";
import MovieGallery from "../../components/MovieGallery";
import {useNavigate, useParams} from "react-router-dom";

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
    const [pages, setPages] = useState([1, 2, 3, 4, 5]);
    const [currPage, setCurrPage] = useState(1);
    const pageOnClick = (e) => {
        const pageNum = parseInt(e.target.textContent);
        changePage(pageNum);
    }
    const changePage = (pageNum) => {
        setCurrPage(pageNum)
        if (pageNum === 1) {
            setCurrPage(1);
            setPages([1, 2, 3, 4, 5]);
        } else if (pageNum >= pages.at(4)) {
            pageNum = pages.at(4)
            const newPages = [];
            for (let i = 0; i < 5; i++) {
                newPages.push(pageNum + i);
            }
            setPages(newPages);
        } else if (pageNum <= pages.at(0)) {
            pageNum = pages.at(0);
            const newPages = [];
            for (let i = 4; i >= 0; i--) {
                newPages.push(pageNum - i);
            }
            setPages(newPages);
        }
    }
    const firstOnClick = () => {
        changePage(1);
    }
    const previousOnClick = () => {
        if (currPage > 1) {
            changePage(currPage-1)
        }
    }
    const nextOnClick = () => {
        changePage(currPage+1)
    }
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
                    <nav className={"p-4 pb-1"}>
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <div className="page-link" onClick={firstOnClick}>First</div>
                            </li>
                            <li className="page-item">
                                <div className="page-link" onClick={previousOnClick}>Previous</div>
                            </li>
                            {
                                pages.map((p, nth) =>
                                    <li key={nth} className={`page-item ${currPage === p ? "active" : ""}`}>
                                        <div className="page-link" onClick={pageOnClick}>{p}</div>
                                    </li>)
                            }
                            <li className="page-item">
                                <div className="page-link" onClick={nextOnClick}>Next</div>
                            </li>
                        </ul>
                    </nav>
                </div>
            }
        </div>
    )
};
export default MoviesCategoryScreen;