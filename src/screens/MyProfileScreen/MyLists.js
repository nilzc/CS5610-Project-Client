import MovieListItem from "../../components/MovieListItem";
import {useNavigate} from "react-router-dom";

const MyLists = ({lists}) => {
    const navigate = useNavigate();
    const listClickHandler = (list) => {
        navigate(`${list._id}`);
    }
    return (
        <div className="row g-2">
            {lists && lists.map((l, nth) => <MovieListItem key={nth} list={l} onClickHandler={listClickHandler}/>)}
        </div>
    )
};
export default MyLists;