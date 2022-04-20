import {useEffect, useState} from "react";
import * as movieServices from "../../services/movieServices";
import MovieGallery from "../../components/MovieGallery";
import {useNavigate} from "react-router-dom";

const MovieSection = ({findMoviesFromServer={}}) => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const findMovies = () => {
        findMoviesFromServer(page)
            .then((ms) => setMovies(ms.slice(0, 5)))
            .catch(e => alert(e.response.data));
    }
    const posterOnClickHandler = (movie) => {
        navigate(`/movies/${movie.id}`);
    }
    useEffect(findMovies, [findMoviesFromServer, page]);
    return (
        <div className={`list-group-item bg-light m-2 p-4`}>
            <MovieGallery  movies={movies} posterOnClickHandler={posterOnClickHandler}/>
        </div>

    )
};
export default MovieSection;