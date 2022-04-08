import {useState} from "react";
import * as movieServices from "../../services/movieServices";
import MovieGallery from "../MovieGallery";

const SearchBar = ({movieOnClickHandler, submitHandler}) => {
    const [searchResults, setSearchResults] = useState([]);
    const [page, setPage] = useState(1)
    const searchFieldOnChange = (e) => {
        const query = e.target.value.trim();
        if (query) {
            movieServices.searchMovie(query, page)
                .then(results => setSearchResults(results))
                .catch(err => alert(err.response.data.message));
        }
    }
    return (
        <div>
            <label className={"form-label"}>
                Search:
                <input className={"form-control"} type={"text"}
                       onChange={(e) => searchFieldOnChange(e)}/>
            </label>
            <button className={"btn btn-primary"} onClick={submitHandler}>Submit</button>
            {searchResults && <MovieGallery movies={searchResults} onClickHandler={movieOnClickHandler}/>}
        </div>
    )
};
export default SearchBar;