import MyReviewItem from "./MyReviewItem";
import {useCallback, useEffect, useState} from "react";
import * as reviewServices from "../../services/reviewServices";
import {MY} from "../../services/utils";
import * as errorServices from "../../services/errorServices";

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const findReviews = useCallback(
        () => {
            reviewServices.findAllReviewsOwnedByUserWithMovieDetails(MY)
                .then(rs => setReviews(rs))
                .catch(errorServices.alertError);
        }, []
    )
    useEffect(findReviews, [findReviews]);
    return (
        <div className={"row m-3"}>
            {
                reviews.length > 0 &&
                reviews.map((r, nth) =>
                    <div key={nth + "div"} className={"col-12 p-0"}>
                        <MyReviewItem key={nth} review={r} refresh={findReviews}/>
                    </div>
                )
            }
        </div>
    )
};
export default MyReviews;