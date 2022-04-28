import {MOVIE_DETAIL_URL, MY} from "../../services/utils";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";

const ReviewItem = ({review, refresh, allowDelete = true}) => {
    const dispatch = useDispatch();
    const loggedInUserId = useSelector(getUserId);
    const isMyReview = review.postedBy && loggedInUserId ? review.postedBy._id === loggedInUserId : false;
    const deleteReview = () => {
        reviewServices.deleteReview(MY, review._id)
            .then((res) => refresh())
            .catch((e) => errorServices.alertError(e, dispatch));

    }
    const navigate = useNavigate();
    const goToMovieDetails = (movie) => {
        navigate(`${MOVIE_DETAIL_URL}/${movie.id}`);
    }
    return (
        <div className={"row justify-content-between bg-light border p-0"}>
            <div className="col-12 bg-light">
                <div className="row p-3">
                    <div className="d-none d-md-block col-md-3 col-lg-2 align-self-start pt-2" onClick={() => goToMovieDetails(review.movie)}>
                        <img
                            src={`${review.movie && review.movie.poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342/${review.movie.poster_path}` : ""}`}
                            className="img-fluid" alt="Poster Not Found"/>
                    </div>
                    <div className="col col-md-9 col-lg-10">
                        <div className={"row m-0 align-self-center justify-content-between"}>
                            <h5 className="col p-0">{review.movie && review.movie.title}</h5>
                            <div className="col-3 col-md-2 col-lg-1">
                                {
                                    isMyReview && allowDelete &&
                                    <button className={"btn btn-danger"}
                                            onClick={deleteReview}>Delete</button>
                                }
                            </div>
                        </div>
                        <h6 className="text-muted p-0">Rating: {review.rating}/10</h6>
                        <p className=" p-0">{review.review}</p>
                    </div>
                </div>
            </div>
        </div>

    )
};
export default ReviewItem;