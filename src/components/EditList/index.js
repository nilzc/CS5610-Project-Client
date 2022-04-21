import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Search from "../Search";
import * as movieServices from "../../services/movieServices";
import MovieGallery from "../MovieGallery";
import {INITIAL_PAGES} from "../../services/utils";
import Pagination from "../Pagination";
import NoMoviesFound from "../NoMoviesFound";


const EditList = ({currList={listName: "", movies: []}, submitHandler}) => {
    
    const navigate = useNavigate();
    const [listName, setListName] = useState(currList.listName);
    const [searchResults, setSearchResults] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [pages, setPages] = useState(INITIAL_PAGES);
    const [allowNextPages, setAllowNextPages] = useState(false);
    const [movieSelected, setMovieSelected] = useState(currList.movies);
    const [query, setQuery] = useState("");
    const searchMovie = useCallback(
        () => {
            if (query) {
                movieServices.searchMovie(query, currPage)
                    .then(results => {
                        setSearchResults(results)
                        setAllowNextPages(results.length > 0);
                    })
                    .catch(err => alert(err.response.data.error));
            }
        }, [currPage, query]
    )
    const searchInputOnChangeHandler = (e) => {
        const newQuery = e.target.value.trim();
        if (newQuery) {
            setQuery(newQuery);
            setCurrPage(1);
            setPages(INITIAL_PAGES);
        }
    }
    const addMovieOnClickHandler = (movie) => {
        const isFound = movieSelected.some((element) => {
            return element.id === movie.id;
          });
          const newMovieList = !isFound ? [...movieSelected, movie] : movieSelected;
    
          if (isFound) {
            alert("Movie is already in the list.");
          }else{
            setMovieSelected(newMovieList);
          }
    }
    const deleteMSOnClickHandler = (movie) => {
        // Remove the movie from list
        let deleteSelectedList = movieSelected.filter(i => i.id !== movie.id)
        setMovieSelected(deleteSelectedList);
    }

    const loggedIn = useSelector(isLoggedIn);
    const init = () => {
        if (!loggedIn) {
            navigate("/login");
            return;
        }
        searchMovie()
    }

    useEffect(init, [loggedIn, navigate, searchMovie]);
    return (
        <div className={"row"}>
            <div className={"m-3"}>
                <div className={"search"}>
                    <h4 className="text-primary">List Name</h4>
                    <div className={"d-inline-block"}>
                        <input className={"form-control mb-3 mt-2"} type={"text"} value={listName ? listName : ""}
                               onChange={(e) => setListName(e.target.value)} required placeholder="Give this list a name"/>
                    </div>
                </div>
            </div>
            <Search inputOnChangeHandler={searchInputOnChangeHandler} />
            <div className={"m-4 bg-light p-4 border"}>
                {
                    searchResults.length > 0 &&
                    <MovieGallery movies={searchResults} posterOnClickHandler={(arg) => {}} addMovieOnClickHandler={addMovieOnClickHandler}/>
                }
                {
                    searchResults.length === 0 &&
                    <NoMoviesFound/>
                }
                <Pagination currPage={currPage} setCurrPage={setCurrPage} setPages={setPages} pages={pages} allowNextPages={allowNextPages}/>
            </div>

            <div className={"col-12 m-3"}>
                <h3 className="mt-3 text-primary">Movies In Your List</h3>
                <div className="row bg-light">
                    {movieSelected &&
                        movieSelected.map((litem, t) => {
                            return (
                                <div className="col-12 border p-3" key={t}>
                                    <div className={"row align-items-start"}>
                                        <div className={"col-1 pt-1"}>
                                            <img src={`${litem.poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342/${litem.poster_path}` : ""}`} className="img-fluid" alt="Poster Not Found" />
                                        </div>
                                        <div className="col-11">
                                            <div className={"row align-items-center"}>
                                                <h4 className="col fs-4">{litem.title}</h4>
                                                <i className="col-1 fas fa-times text-center" style={{color: 'red'}} onClick={() => deleteMSOnClickHandler(litem)}/>
                                            </div>
                                            <p className="fs-6"> Release Date: {litem.release_date}</p>
                                            {litem.overview && <p className="fs-6">Description: <span className={"text-secondary"}>{litem.overview}</span></p>}
                                        </div>
                                    </div>
                                </div>

                            );
                        })}
                </div>
            </div>
            <div className={"col-2 m-3"}>
                <button className="btn btn-primary rounded-pill w-100"
                        onClick={() => submitHandler({listName: listName, movies: movieSelected.map(m => m.id)})}>Submit</button>
            </div>
        </div>
    )
};
export default EditList;