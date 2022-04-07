import {useSearchParams, useNavigate, Outlet} from "react-router-dom";

const SearchScreen = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const searchFieldOnchangeHandler = (event) => {
        let query = event.target.value;
        if (query) {
            setSearchParams({query});
        } else {
            setSearchParams({});
        }
    }
    const searchButtonOnclickHandler = () => {
        navigate({
            pathname: "results",
            search: searchParams.toString()
        })
    }
    return (
        <div>
            <label className={"form-label"}>
                Search:
                <input className={"form-control"} type={"text"} onChange={searchFieldOnchangeHandler}/>
            </label>
            <button className={"btn btn-primary"} onClick={searchButtonOnclickHandler}>Search</button>
            <div>
                query string is : {searchParams.get("query")}
            </div>
            <Outlet/>
        </div>
    )
};
export default SearchScreen;