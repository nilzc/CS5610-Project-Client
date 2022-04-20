import MovieGallery from "../../components/MovieGallery";
import {useNavigate} from "react-router-dom";

const MovieSection = ({movies}) => {
    const navigate = useNavigate();
    const posterOnClickHandler = (movie) => {
        navigate(`/movies/${movie.id}`);
    }
    return (
        <div className={`list-group-item bg-light m-2 p-4`}>
            <MovieGallery  movies={movies} posterOnClickHandler={posterOnClickHandler}/>
        </div>

    )
};
export default MovieSection;