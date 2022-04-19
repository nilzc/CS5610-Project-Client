import {useNavigate, useSearchParams} from "react-router-dom";
import * as movieServices from "../../services/movieServices";
import {useEffect, useState} from "react";
import MovieGallery from "../../components/MovieGallery";
import Search from "../../components/Search";

const SearchResultsScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([]);
    const [inputString, setInputString] = useState("");
    const searchMovies = () => {
        movieServices.searchMovie(searchParams.get("query"), page)
            .then(movies => setResults(movies))
            .catch(err => alert(err.response.data.error));
    };
    const submitHandler = () => {
        setSearchParams({query: inputString});
    }
    const inputOnChangeHandler = (e) => {
        setInputString(e.target.value);
    }
    useEffect(searchMovies, [page, searchParams]);
    const navigate = useNavigate();
    const posterOnClickHandler = (li) => {
        navigate('/movies/'+li.id)
    }
    // TODO: add pagination
    return (
        <>
            <Search submitHandler={submitHandler} inputOnChangeHandler={inputOnChangeHandler}/>
            <div className={"bg-light p-4 border"}>
                <MovieGallery movies={results} posterOnClickHandler={posterOnClickHandler}/>
            </div>
        </>
    )
};
export default SearchResultsScreen;