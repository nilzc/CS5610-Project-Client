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
            <div>Movies: {list.movies}</div>
            <button className={"btn btn-primary"} onClick={() => onClickHandler(list)}>Action</button>
        </div>
    )
};
export default MovieListItem;