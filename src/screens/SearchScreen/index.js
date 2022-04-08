import {useSearchParams, useNavigate, Outlet} from "react-router-dom";

const SearchScreen = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const searchButtonOnClick = () => {
        navigate({
            pathname: "results",
            search: searchParams.toString()
        })
    }
    return (
        <div>
            <label className={"form-label"}>
                Search:
                <input className={"form-control"} type={"text"}
                       onChange={(e) => setSearchParams({query: e.target.value})}/>
            </label>
            <button className={"btn btn-primary"} onClick={searchButtonOnClick}>Search</button>
            <div>
                query string is : {searchParams.get("query")}
            </div>
            <Outlet/>
        </div>
    )
};
export default SearchScreen;