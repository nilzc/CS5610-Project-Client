import ReviewItem from "../../components/Reviews/ReviewItem";
import {useCallback, useEffect, useState} from "react";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";

const Reviews = ({uid, showPrivate}) => {
    const [reviews, setReviews] = useState([]);
    const findReviews = useCallback( () => {
        if(uid){
            reviewServices.findAllReviewsOwnedByUserWithMovieDetails(uid)
                .then(rs => setReviews(rs))
                .catch(errorServices.alertError);
        }
        }, [uid]);
    useEffect(findReviews, [findReviews]);
    return (
        <div className={"row m-3"}>
            {
                reviews.length > 0 &&
                reviews.map((r, nth) =>
                    <div key={nth + "div"} className={"col-12 p-0"}>
                        <ReviewItem key={nth} review={r} refresh={findReviews} showPrivate={showPrivate}/>
                    </div>
                )
            }
        </div>
    )
};
export default Reviews;