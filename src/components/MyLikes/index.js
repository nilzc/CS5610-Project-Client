import * as reviewServices from "../../services/reviewServices";
import * as listServices from "../../services/listServices";
import {useEffect, useState} from "react";
import * as errorServices from "../../services/errorServices";
import MovieListItem from "../MovieListItem";
import MovieReviewItem from "../MovieReviewItem";

const CATEGORY_ITEMS = {
    "review": {"func": reviewServices.findAllReviewsLikedByUserWithMovieDetails},
    "list": {"func": listServices.findAllListsOwnedByUserWithMovieDetails}
}
// TODO: maybe refactor to multiple routes
const MyLikes = ({uid}) => {
    const [category, setCategory] = useState("review")
    const [items, setItems] = useState([]);
    const findItems = () => {
        if (category && uid) {
            CATEGORY_ITEMS[category].func(uid)
                .then(rs => setItems(rs))
                .catch(errorServices.alertError);
        }
    }
    useEffect(findItems, [category, uid]);
    return (
        <div className={"row m-3"}>
            <div className={"col-3"}>
                <select className="form-select form-select mb-3"
                        onChange={(e) => setCategory(e.target.value)}>
                    <option value="review">Reviews</option>
                    <option value="list">Lists</option>
                    <option value="movie">Movies</option>
                </select>
            </div>
            <div className={"col-12"}>
                <div className={"row m-0"}>
                    {
                        items && items.length > 0 &&
                        <>
                            {
                                category === "review" &&
                                items.map((r, nth) =>
                                    <div key={nth + "div"} className={"col-12"}>
                                        <MovieReviewItem key={nth} review={r} refresh={findItems}/>
                                    </div>
                                )
                            }
                            {
                                category === "list" &&
                                <div className={"row g-2"}>
                                    {
                                        items.map((l, nth) =>
                                            <MovieListItem key={nth} list={l} onClickHandler={() => {}}/>)
                                    }
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
};
export default MyLikes;