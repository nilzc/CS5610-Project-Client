import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as listServices from "../../services/listServices";
import {MY} from "../../services/utils";
import Search from "../../components/Search";
import * as movieServices from "../../services/movieServices";
import MovieGallery from "../../components/MovieGallery";


const CreateNewListScreen = () => {
    
    const navigate = useNavigate();
    const [listName, setListName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [resultPage, setResultPage] = useState(1)
    const [movieSelected, setMovieSelected] = useState([]);

    const searchInputOnChangeHandler = (e) => {
        const query = e.target.value.trim();
        if (query) {
            movieServices.searchMovie(query, resultPage)
                .then(results => setSearchResults(results))
                .catch(err => alert(err.response.data.error));
        }
    }

    const submitHandler = () => {
        listServices.createList(MY, {listName: listName, movies: movieSelected.map(m => m.id)})
            .then((response) => {
                navigate("/profile");
                alert("Movie list created!");
            }).catch(err => alert(err.response.data.error));
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
    const checkLogin = () => {
        if (!loggedIn) {
            navigate("/login");
        }
    }

    useEffect(checkLogin, [loggedIn, navigate]);
    return (
        <div className={"row"}>
            <div className={"m-3"}>
                <div className={"search"}>
                    <h4 className="text-primary">List Name</h4>
                    <div className={"d-inline-block"}>
                        <input className={"form-control mb-3 mt-2"} type={"text"}
                               onChange={(e) => setListName(e.target.value)} required placeholder="Give this list a name"/>
                    </div>
                </div>
            </div>
            <Search inputOnChangeHandler={searchInputOnChangeHandler} />
            <div className={"m-3"}>
                <MovieGallery movies={searchResults} posterOnClickHandler={(arg) => {}} addMovieOnClickHandler={addMovieOnClickHandler}/>
            </div>

            <div className={"m-3"}>
                <h3 className="mt-3 text-primary">Movies In Your List</h3>
                <ul className="list-group">
                    {movieSelected &&
                        movieSelected.map((litem, t) => {
                            return (
                                <li className="mt-2 list-group-item d-flex align-items-start" key={t}>
                                    <div className={"col-1"}>
                                        <img src={`${litem.poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342/${litem.poster_path}` : ""}`} className="img-fluid" alt="Poster Not Found" />
                                    </div>
                                    <div className="col ms-4 w-100">
                                        <span className="fs-4">{litem.title}</span>
                                        <p className="fs-6"> Release Date: {litem.release_date}</p>
                                        {litem.overview && <p className="fs-6">Description: <span className={"text-secondary"}>{litem.overview}</span></p>}
                                    </div>
                                    <div className="ms-4 fw-bold " style={{float: 'right', color: 'red'}}>
                                        <i className="fas fa-times" onClick={() => deleteMSOnClickHandler(litem)}/>
                                    </div>
                                </li>

                            );
                        })}
                </ul>
            </div>
            <div className={"col-2 m-3"}>
                <button className="btn btn-primary rounded-pill w-100" onClick={submitHandler}>Submit</button>
            </div>
        </div>
    )
};
export default CreateNewListScreen;