import MovieItem from "../MovieItem";

const MovieGallery = ({
                          movies = [{
                              title: "Spider-Man: No Way Home",
                              release_date: "2021-12-15",
                              poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
                          }], posterOnClickHandler, addMovieOnClickHandler
                      }) => {
    return (
        <div className={"row"}>
            {
                movies && movies.map((movie, nth) =>
                    <div className={"col-2 mt-1 mb-1"} key={nth}>
                        <MovieItem key={movie.id} movie={movie} posterOnClickHandler={posterOnClickHandler} addMovieOnClickHandler={addMovieOnClickHandler}/>
                    </div>
                )
            }
        </div>
    )
};
export default MovieGallery;