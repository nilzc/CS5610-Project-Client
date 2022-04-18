import MovieGallery from "../MovieGallery";

const MovieListItem = ({
                           list = {
                               _id: "1",
                               listName: "My List",
                               movies: ["1726", "10138", "68721"]},
                           onClickHandler
                       }) => {
    return (
        <div className={`list-group-item p-3 bg-light`}>
            <div className={`d-flex justify-content-between`}>
                <div className={`h4 text-primary m-1`}>List Name: <span className={`fw-normal text-black`}>{list.listName}</span></div>
                <button className={"btn btn-primary m-1 "}  onClick={() => onClickHandler(list)}>Action</button>
            </div>

            <MovieGallery movies={list.movies} posterOnClickHandler={() => {}}/>

        </div>
    )
};
export default MovieListItem;