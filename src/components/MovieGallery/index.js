import MovieItem from "../MovieItem";

const MovieGallery = ({
                          movies = [{
                              title: "Spider-Man: No Way Home",
                              release_date: "2021-12-15",
                              poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
                          }]
                      }) => {
    return (
        <div className={"col-3"}>
            {
                movies && movies.map(movie => <MovieItem movie={movie}/>)
            }
        </div>
    )
};
export default MovieGallery;