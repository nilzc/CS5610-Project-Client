import {useSearchParams, useNavigate} from "react-router-dom";
import Search from "../../components/Search";

const SearchScreen = () => {
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const submitHandler = () => {
        navigate({
            pathname: "results",
            search: searchParams.toString()
        })
    }
    const inputOnChangeHandler = (e) => {
        setSearchParams({query: e.target.value})
    }
    return (
        <div>
            <Search inputOnChangeHandler={inputOnChangeHandler} submitHandler={submitHandler}/>
        </div>
    )
};
export default SearchScreen;