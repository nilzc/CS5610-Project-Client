import {useState} from "react";
import * as movieServices from "../../services/movieServices";

const PopularMovies = () => {
    const [popularMovies, setPopularMovies] = useState();
    const findPopularMovies = () => {
        movieServices.findPopularMovies(1)
            .then((movies) => setPopularMovies(movies))
            .catch(e => alert(e.response.data));
    }
}