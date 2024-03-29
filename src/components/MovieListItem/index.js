import './index.css';

const MovieListItem = ({
                           list = {
                               _id: "1",
                               listName: "My List",
                               movies: ["1726", "10138", "68721"]
                           }
                           , onClickHandler
                       }) => {
    const posterPath = list.movies && list.movies.length > 0 && list.movies[0].poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342${list.movies[0].poster_path}` :
        "https://mdbcdn.b-cdn.net/img/new/fluid/nature/015.webp";
    return (
        <div className="col" onClick={() => onClickHandler(list)}>
            <div className="list-container 
                        d-flex flex-column 
                        justify-content-center 
                        align-items-center
                        rounded" style={{backgroundImage: `url(${posterPath})`}}>
                <h4 className="position-relative text-white">List Name: {list.listName}</h4>
                <h4 className="position-relative text-white">{list.movies && list.movies.length} Items</h4>
            </div>
        </div>
    )
};
export default MovieListItem;