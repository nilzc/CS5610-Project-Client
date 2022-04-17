import MovieGallery from "../MovieGallery";

const MovieListItem = ({
                           list = {
                               _id: "1",
                               listName: "My List",
                               movies: ["1726", "10138", "68721"]},
                           onClickHandler
                       }) => {
    return (
        <div className={`list-group-item p-3`}>
            <div className={`h4 text-primary`}>List Name: <span className={`fw-normal text-black`}>{list.listName}</span></div>
            <MovieGallery movies={list.movies} posterOnClickHandler={() => {}}/>
            <button className={"btn btn-primary"}  onClick={() => onClickHandler(list)}>Action</button>
        </div>
    )
};
export default MovieListItem;