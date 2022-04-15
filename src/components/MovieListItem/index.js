import MovieGallery from "../MovieGallery";

const MovieListItem = ({
                           list = {
                               _id: "1",
                               listName: "My List",
                               movies: ["1726", "10138", "68721"]},
                           onClickHandler
                       }) => {
    return (
        <div>
            <div>ListName: {list.listName}</div>
            <MovieGallery movies={list.movies} posterOnClickHandler={() => {}}/>
            <button className={"btn btn-primary"} onClick={() => onClickHandler(list)}>Action</button>
        </div>
    )
};
export default MovieListItem;