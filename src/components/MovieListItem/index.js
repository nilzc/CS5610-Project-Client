import './index.css';

const MovieListItem = ({
                           list = {
                               _id: "1",
                               listName: "My List",
                               movies: ["1726", "10138", "68721"]}
                       ,onClickHandler}) => {
    const posterPath = list.movies.length > 0 && list.movies[0].poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342${list.movies[0].poster_path}` : 
    "https://mdbcdn.b-cdn.net/img/new/fluid/nature/015.webp";

    return (
      
        <div className="col-6" onClick={() => onClickHandler(list)}>
            <div className="list-container 
                        d-flex flex-column 
                        justify-content-center 
                        align-items-center
                        rounded" style={{backgroundImage: `url(${posterPath})`}}>
                <h4 className="position-relative text-white">List Name: {list.listName}</h4>
                <h4 className="position-relative text-white">{list.movies.length} Items</h4>
            </div>
        </div>

        // <div className={`list-group-item p-3 bg-light`}>
        //     <div className={`d-flex justify-content-between`}>
        //         <div className={`h4 text-primary m-1`}>List Name: <span className={`fw-normal text-black`}>{list.listName}</span></div>
        //         <button className={"btn btn-primary m-1 "}  onClick={() => onClickHandler(list)}>Action</button>
        //     </div>

        //     <MovieGallery movies={list.movies} posterOnClickHandler={() => {}}/>

        // </div>
    )
};
export default MovieListItem;