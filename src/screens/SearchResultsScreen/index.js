import {useSearchParams} from "react-router-dom";

const SearchResultsScreen = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    return (
        <div>
            Search results on query string: {searchParams.get("query")}
        </div>
    )
};
export default SearchResultsScreen;