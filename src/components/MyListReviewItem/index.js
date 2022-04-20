import React from "react";

const MyListReviewItem = ({review, isMyReview, deleteReview}) => {
    return(
        <div className="row p-2">
                        <div className="col-6">
                        <h5 className=" p-1">Written by <span className="text-success fw-bold"><u>{review.postedBy.username}</u>
                        </span> on {new Date(review.createdOn).toString().split(' ').slice(1,3).join(' ')}, {new Date(review.createdOn).getFullYear()}</h5>
                        <p className="p-1">{review.review}</p>
                        <h6 className="text-muted p-1 ">Rating: {review.rating}/10</h6>
                        </div>
                        <div className="col-6">
                        {
                            isMyReview &&
                            <div className="float-end"><button className={"btn btn-danger"}
                                    onClick={deleteReview}>Delete</button></div>
                        }
                        </div>
        </div>
    )
}

export default MyListReviewItem;