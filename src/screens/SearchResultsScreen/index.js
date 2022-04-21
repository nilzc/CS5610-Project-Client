import {useNavigate, useSearchParams} from "react-router-dom";
import * as movieServices from "../../services/movieServices";
import {useCallback, useEffect, useState} from "react";
import MovieGallery from "../../components/MovieGallery";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import {INITIAL_PAGES} from "../../services/utils";

const SearchResultsScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currPage, setCurrPage] = useState(1);
    const [pages, setPages] = useState(INITIAL_PAGES);
    const [results, setResults] = useState([]);
    const [inputString, setInputString] = useState("");
    const submitHandler = () => {
        setSearchParams({query: inputString});
        setCurrPage(1);
        setPages(INITIAL_PAGES)
    }
    const inputOnChangeHandler = (e) => {
        setInputString(e.target.value);
    }
    const navigate = useNavigate();
    const posterOnClickHandler = (li) => {
        navigate('/movies/'+li.id)
    }
    const searchMovies = useCallback(
        () => {
            movieServices.searchMovie(searchParams.get("query"), currPage)
                .then(movies => setResults(movies))
                .catch(err => alert(err.response.data.error));
        }, [currPage, searchParams]
    )
    useEffect(searchMovies, [searchMovies]);
    return (
        <>
            <Search submitHandler={submitHandler} inputOnChangeHandler={inputOnChangeHandler}/>
            <div className={"bg-light p-4 border"}>
                {
                    results.length > 0 &&
                    <MovieGallery movies={results} posterOnClickHandler={posterOnClickHandler}/>
                }
                {
                    results.length === 0 &&
                    <div className={"fs-5 text-center"}>Sorry, no movies are found</div>
                }
                <Pagination currPage={currPage} setCurrPage={setCurrPage} pages={pages} setPages={setPages}/>
            </div>
        </>
    )
};
export default SearchResultsScreen;