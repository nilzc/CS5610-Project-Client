import MovieGallery from "../../components/MovieGallery";
import {useNavigate} from "react-router-dom";
import {MOVIE_DETAIL_URL} from "../../services/utils";

const MovieSection = ({movies}) => {
    const navigate = useNavigate();
    const posterOnClickHandler = (movie) => {
        navigate(`${MOVIE_DETAIL_URL}/${movie.id}`);
    }
    return (
        <div className={`list-group-item bg-light m-2 p-4`}>
            <MovieGallery movies={movies} posterOnClickHandler={posterOnClickHandler}/>
        </div>

    )
};
export default MovieSection;