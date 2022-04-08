import {useSelector} from "react-redux";
import {isLoggedIn} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import SearchBarInplace from "../../components/SearchBarInplace";
import * as listServices from "../../services/listServices";
import {MY} from "../../services/constants";

const CreateNewListScreen = () => {
    const loggedIn = useSelector(isLoggedIn);
    const [listName, setListName] = useState("");
    const [movieList, setMovieList] = useState([]);
    const navigate = useNavigate();
    const checkLogin = () => {
        if (!loggedIn) {
            navigate("/login");
            alert("Please login first!");
        }
    }
    const movieOnClickHandler = (movie) => {
        console.log(movie.title)
        setMovieList([...new Set([...movieList, movie.id])]);
    }
    const submitHandler = () => {
        listServices.createList(MY, {listName: listName, movies: movieList})
            .then((response) => {
                navigate("/profile");
                alert("Movie list created!");
            }).catch(err => err.response.data.message);
    }
    useEffect(checkLogin, [loggedIn, navigate]);
    return (
        <div>
            <label className={"form-label"}>
                List Name:
                <input className={"form-control"} type={"text"}
                       onChange={(e) => setListName(e.target.value)}/>
            </label>
            <SearchBarInplace movieOnClickHandler={movieOnClickHandler} submitHandler={submitHandler}/>
        </div>
    )
};
export default CreateNewListScreen;