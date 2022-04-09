const MovieItem = ({
                       movie = {
                           title: "Spider-Man: No Way Home",
                           release_date: "2021-12-15",
                           poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
                       }, posterOnClickHandler, addMovieOnClickHandler
                   }) => {
    const posterPath =
        movie.poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342/${movie.poster_path}` : "";
    return (
        // we can have multiple clickable elements, each of them can have a handler provided by the parent
        <div className={"col-3 card"} onClick={() => posterOnClickHandler(movie)}>
            <img className={"card-img-top mt-2"} src={posterPath} alt={"Poster Not Found"} style={{height:'300px'}}/>
            <div className={"card-body"}>
                <h6 className={"card-title"}>{movie.title}</h6>
                <h6 className={"card-subtitle"}>{movie.release_date}</h6>
            </div>
            {addMovieOnClickHandler && <button className={"btn btn-primary mb-2"} onClick={() => addMovieOnClickHandler(movie)}>Add Movie to List</button>}
        </div>
    )
};
export default MovieItem;