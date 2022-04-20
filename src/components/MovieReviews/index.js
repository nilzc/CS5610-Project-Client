import MovieReviewItem from "../MovieReviewItem";
import {useEffect} from "react";
import {resetScrollToTop} from "../../services/utils";

const MovieReviews = ({reviews, refresh}) => {
    useEffect(resetScrollToTop, [])
    return (
        <div className={"row m-3"}>
            {
                reviews.map((r, nth) =>
                    <div key={nth + "div"} className={"col-12 p-0"}>
                        <MovieReviewItem key={nth} review={r} refresh={refresh}/>
                    </div>
                )
            }
        </div>
    )
};
export default MovieReviews;