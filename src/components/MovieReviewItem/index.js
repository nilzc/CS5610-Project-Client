import {useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import {getDate, MY} from "../../services/utils";
import React from "react";


const MovieReviewItem = ({
                             review = {
                                 review: "dummy", postedBy: {username: "bob"}
                             },
                             refresh
                         }) => {
    const loggedInUserId = useSelector(getUserId);
    const isMyReview = loggedInUserId ? review.postedBy._id === loggedInUserId : false;
    const deleteReview = () => {
        reviewServices.deleteReview(MY, review._id)
            .then(refresh)
            .catch(errorServices.alertError);
    }
    return (
        <div className={"row justify-content-between bg-light border p-0"}>
            <div className="col-12 bg-light">
                <div className="row p-2">
                    <div className="col-12">
                        <div className={"row m-0 pt-2 pb-2"}>
                            <h5 className="col p-1">Written by
                                <span className="text-success fw-bold text-decoration-underline ps-1">
                                    {review.postedBy.username}
                                </span> on {getDate(review.createdOn)}
                            </h5>
                            <div className="col-1 p-0">
                                {
                                    isMyReview &&
                                    <div className="float-end">
                                        <button className={"btn btn-danger"}
                                                onClick={deleteReview}>Delete
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                        <p className="p-1 overflow-hidden" style={{maxHeight: "8rem"}}>{review.review}</p>
                        <h6 className="text-muted p-1 ">Rating: {review.rating}/10</h6>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default MovieReviewItem;