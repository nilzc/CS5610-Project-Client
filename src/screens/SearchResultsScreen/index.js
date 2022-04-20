import {useNavigate, useSearchParams} from "react-router-dom";
import * as movieServices from "../../services/movieServices";
import {useCallback, useEffect, useState} from "react";
import MovieGallery from "../../components/MovieGallery";
import Search from "../../components/Search";

const SearchResultsScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [currPage, setCurrPage] = useState(1);
    const [pages, setPages] = useState([1, 2, 3, 4, 5]);
    const [results, setResults] = useState([]);
    const [inputString, setInputString] = useState("");
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
    const submitHandler = () => {
        setSearchParams({query: inputString});
        changePage(1);
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
        </>
    )
};
export default SearchResultsScreen;