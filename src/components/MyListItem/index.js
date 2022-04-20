import React from "react";

const MyListItem = ({review, onClickNavigate, isMyReview, deleteReview}) => {
    return(
        <div className="row p-4">
                        <div className="col-2" onClick={() => onClickNavigate(review.movie)}>
                            <img src={`${review.movie.poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342/${review.movie.poster_path}` : ""}`} className="img-fluid" alt="Poster Not Found" />
                        </div>
                        <div className="col-9">
                        <h5 className=" p-1">{review.movie.title}</h5>
                        <h6 className=" text-muted p-1 ">Rating: {review.rating}/10</h6>
                        <p className=" p-1">{review.review}</p>
                        </div>
                        <div className="col-1">
                        {
                            isMyReview &&
                            <button className={"btn btn-danger"}
                                    onClick={deleteReview}>Delete</button>
                        }
                        </div>
        </div>
    )
}

export default MyListItem;