import MovieItem from "../MovieItem";

const MovieGallery = ({
                          movies = [{
                              title: "Spider-Man: No Way Home",
                              release_date: "2021-12-15",
                              poster_path: ""
                          }], posterOnClickHandler, addMovieOnClickHandler, refresh, allowLike=false
                      }) => {
    return (
        <div className={"row row-cols-2 row-cols-md-5 g-3"}>
            {
                movies && movies.map((movie, nth) =>
                <MovieItem key={nth} movie={movie} posterOnClickHandler={posterOnClickHandler}
                           addMovieOnClickHandler={addMovieOnClickHandler} refresh={refresh} allowLike={allowLike}/>
                )
            }
        </div>
    )
};
export default MovieGallery;