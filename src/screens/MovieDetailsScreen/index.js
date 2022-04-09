import {useParams} from "react-router-dom";
import * as movieServices from "../../services/movieServices";
import {useEffect, useState} from "react";
import MovieItem from "../../components/MovieItem";

const MovieDetailsScreen = () => {
    let params = useParams();
    const [movie, setMovie] = useState({});
    const findMovie = () => {
        movieServices.findMovieDetail(params.mid)
            .then((m) => setMovie(m))
            .catch(err => alert(err.response.data.error))
    }
    useEffect(findMovie, [params.mid])
    return (
        <div>
            Movie details page (change the content below with more detailed components):
            <MovieItem movie={movie} posterOnClickHandler={() => {}}/>
        </div>
    )
};
export default MovieDetailsScreen;