import {useSelector} from "react-redux";
import {getUserId, isLoggedIn} from "../../redux/selectors";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import {getDate, MY} from "../../services/utils";
import React, {useEffect, useState} from "react";


const MovieReviewItem = ({
                             review = {
                                 review: "dummy", postedBy: {username: "bob"}
                             },
                             refresh
                         }) => {
    const loggedIn = useSelector(isLoggedIn);
    const loggedInUserId = useSelector(getUserId);
    const isMyReview = review.postedBy && loggedInUserId ? review.postedBy._id === loggedInUserId : false;
    const [liked, setLiked] = useState(false);
    const deleteReview = () => {
        reviewServices.deleteReview(MY, review._id)
            .then(refresh)
            .catch(errorServices.alertError);
    }
    const likeReview = () => {
        if (!loggedIn) {
            alert("Please login first!");
            return;
        }
        reviewServices.userLikesReview(MY, review._id)
            .then(refresh)
            .catch(errorServices.alertError);
    }
    const userAlreadyLikesReview = () => {
        if (loggedIn) {
            reviewServices.findUserLikesReview(MY, review._id)
                .then(res => setLiked(!!res))
                .catch(errorServices.alertError);
        } else {
            setLiked(false)
        }
    }
    useEffect(userAlreadyLikesReview, [loggedIn, review]);
    return (
        <div className={"row justify-content-between bg-light border p-0"}>
            <div className="col-12 bg-light">
                <div className="row p-2">
                    <div className="col-12">
                        <div className={"row m-0 pt-2 pb-2"}>
                            <h5 className="col p-1">Written by
                                <span className="text-success fw-bold text-decoration-underline ps-1">
                                    {review.postedBy && review.postedBy.username}
                                </span> on {getDate(review.postedOn)}
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
                        <div className={"row m-0 align-items-center"}>
                            <h6 className="col-11 text-muted p-1 ">Rating: {review.rating}/10</h6>
                            <span className={"col-1"}>
                                <div className={"row align-items-center"}>
                                    {
                                        liked &&
                                        <i className={`col-6 fa-solid fa-heart`} style={{color: "red"}} onClick={likeReview}/>
                                    }
                                    {
                                        !liked &&
                                        <i className={`col-6 fa-regular fa-heart`} onClick={likeReview}/>
                                    }
                                    <span className={"col-6"}>{review.stats && review.stats.likes}</span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default MovieReviewItem;