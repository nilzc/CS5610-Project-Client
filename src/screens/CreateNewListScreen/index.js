import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as listServices from "../../services/listServices";
import {MY} from "../../services/constants";
import Search from "../../components/Search";
import * as movieServices from "../../services/movieServices";
import MovieGallery from "../../components/MovieGallery";

const CreateNewListScreen = () => {
    const navigate = useNavigate();
    const [listName, setListName] = useState("");
    const [movieList, setMovieList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [resultPage, setResultPage] = useState(1)
    const searchInputOnChangeHandler = (e) => {
        const query = e.target.value.trim();
        if (query) {
            movieServices.searchMovie(query, resultPage)
                .then(results => setSearchResults(results))
                .catch(err => alert(err.response.data.error));
        }
    }
    const posterOnClickHandler = (movie) => {
        setMovieList([...new Set([...movieList, movie])]);
    }
    const submitHandler = () => {
        listServices.createList(MY, {listName: listName, movies: movieList.map(m => m.id)})
            .then((response) => {
                navigate("/profile");
                alert("Movie list created!");
            }).catch(err => alert(err.response.data.error));
    }
    const loggedIn = useSelector(isLoggedIn);
    const checkLogin = () => {
        if (!loggedIn) {
            navigate("/login");
        }
    }
    useEffect(checkLogin, [loggedIn, navigate]);
    return (
        <div>
            <label className={"form-label"}>
                List Name:
                <input className={"form-control"} type={"text"}
                       onChange={(e) => setListName(e.target.value)}/>
            </label>
            {movieList && <div>Movies Selected: {movieList.map(m => <span key={m.id}>{m.title}, </span>)}</div>}
            <Search inputOnChangeHandler={searchInputOnChangeHandler} submitHandler={submitHandler}/>
            <MovieGallery movies={searchResults} posterOnClickHandler={posterOnClickHandler}/>
        </div>
    )
};
export default CreateNewListScreen;