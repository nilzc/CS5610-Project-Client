import MovieItem from "../MovieItem";

const MovieGallery = ({
                          movies = [{
                              title: "Spider-Man: No Way Home",
                              release_date: "2021-12-15",
                              poster_path: ""
                          }], posterOnClickHandler, addMovieOnClickHandler, movieLikeBadge=false, refresh
                      }) => {
    return (
        <div className={"row row-cols-5 gy-3"}>
            {
                movies && movies.map((movie, nth) =>
                <MovieItem key={nth} movieLikeBadge={movieLikeBadge} movie={movie} posterOnClickHandler={posterOnClickHandler}
                           addMovieOnClickHandler={addMovieOnClickHandler} refresh={refresh}/>
                )
            }
        </div>
    )
};
export default MovieGallery;