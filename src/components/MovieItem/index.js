const MovieItem = ({
                       movie = {
                           title: "Spider-Man: No Way Home",
                           release_date: "2021-12-15",
                           poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
                       }, onClickHandler
                   }) => {
    const posterPath =
        movie.poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342/${movie.poster_path}` : "";
    return (
        <div className={"col-3 card"} onClick={() => onClickHandler(movie)}>
            <img className={"card-img-top"} src={posterPath} alt={"Poster Not Found"}/>
            <div className={"card-body"}>
                <h5 className={"card-title"}>{movie.title}</h5>
                <h6 className={"card-subtitle"}>{movie.release_date}</h6>
            </div>
        </div>
    )
};
export default MovieItem;