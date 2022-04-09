import {useEffect, useState} from "react";
import * as movieServices from "../../services/movieServices";
import MovieGallery from "../../components/MovieGallery";

const MovieSection = ({findMoviesFromServer={}}) => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const findMovies = () => {
        findMoviesFromServer(page)
            // TODO: slice is for simplicity, remove slice when you're working on this component
            .then((ms) => setMovies(ms.slice(0, 4)))
            .catch(e => alert(e.response.data));
    }
    useEffect(findMovies, [findMoviesFromServer, page]);
    return (
        <MovieGallery movies={movies}/>
    )
};
export default MovieSection;