import MovieListItem from "../MovieListItem";

const MovieList = ({
                       lists = [{
                           _id: "1",
                           listName: "My List",
                           movies: []
                       }], listItemOnClickHandler
                   }) => {
    return (
        <div>
            {
                lists && lists.map(l => <MovieListItem key={l._id} list={l} onClickHandler={listItemOnClickHandler}/>)
            }
        </div>
    )
};
export default MovieList;