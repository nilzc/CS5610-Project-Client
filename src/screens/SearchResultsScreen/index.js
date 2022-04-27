import {useNavigate, useSearchParams} from "react-router-dom";
import * as movieServices from "../../services/movieServices";
import {useCallback, useEffect, useState} from "react";
import MovieGallery from "../../components/MovieGallery";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import {INITIAL_PAGES, MOVIE_DETAIL_URL} from "../../services/utils";
import NoMoviesFound from "../../components/NoMoviesFound";

const SearchResultsScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currPage, setCurrPage] = useState(1);
    const [pages, setPages] = useState(INITIAL_PAGES);
    const [allowNextPages, setAllowNextPages] = useState(false);
    const [results, setResults] = useState([]);
    const [inputString, setInputString] = useState("");
    const submitHandler = () => {
        if (inputString){
            setSearchParams({query: inputString});
            setCurrPage(1);
            setPages(INITIAL_PAGES)
        }
    }
    const inputOnChangeHandler = (e) => {
        setInputString(e.target.value);
    }
    const navigate = useNavigate();
    const posterOnClickHandler = (movie) => {
        navigate(`${MOVIE_DETAIL_URL}/${movie.id}`)
    }
    const searchMovies = useCallback(
        () => {
            movieServices.searchMovie(searchParams.get("query"), currPage)
                .then(movies => {
                    setResults(movies)
                    setAllowNextPages(movies.length > 0);
                })
                .catch(err => alert(err.response.data.error));
        }, [currPage, searchParams]
    )
    useEffect(searchMovies, [searchMovies]);
    return (
        <>
            <Search submitHandler={submitHandler} inputOnChangeHandler={inputOnChangeHandler}/>
            <div className={"bg-light m-3 p-4 border"}>
                {
                    results.length > 0 &&
                    <MovieGallery movies={results} posterOnClickHandler={posterOnClickHandler} allowLike={true} movieLikeBadge={true}/>
                }
                {
                    results.length === 0 &&
                   <NoMoviesFound/>
                }
                <Pagination currPage={currPage} setCurrPage={setCurrPage} pages={pages} setPages={setPages} allowNextPages={allowNextPages}/>
            </div>
        </>
    )
};
export default SearchResultsScreen;