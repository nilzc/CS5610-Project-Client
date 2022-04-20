import {IMAGE_PLACEHOLDER} from "../../services/utils";

const MovieItem = ({
                       movie = {
                           title: "Spider-Man: No Way Home",
                           release_date: "2021-12-15",
                           poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
                       }, posterOnClickHandler, addMovieOnClickHandler
                   }) => {
    const posterPath =
        movie.poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342/${movie.poster_path}` : IMAGE_PLACEHOLDER;
    return (
        <div className={"col"}>
            <div className={"shadow"}>
                <div className={"overflow-hidden bg-black rounded-top"} style={{width: "100%", height: "0", paddingBottom: "150%"}}
                     onClick={() => posterOnClickHandler(movie)}>
                    <img className={"img-fluid"} src={posterPath} alt={"Poster Not Found"}/>
                </div>
                <div className={"p-2 ps-3 pe-3 rounded-bottom bg-white overflow-hidden"}>
                    <div style={{width: "100%", height: "0", paddingBottom: "60%"}}>
                        <div className={"fs-6 fw-bold"}>{movie.title}</div>
                        <div className={"fs-6 text-secondary"}>{movie.release_date}</div>
                    </div>
                </div>
                {
                    addMovieOnClickHandler &&
                    <div className={"row justify-content-center pb-3"}>
                        <button className={"col-8 btn btn-primary"} onClick={() => addMovieOnClickHandler(movie)}>Add Movie</button>
                    </div>
                }
            </div>
        </div>
    )
};
export default MovieItem;