import {MY} from "../../services/utils";
import React from "react";
import {useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import {useNavigate} from "react-router-dom";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";

const ReviewItem = ({review, refresh, allowDelete = true}) => {
    const loggedInUserId = useSelector(getUserId);
    const isMyReview = review.postedBy && loggedInUserId ? review.postedBy._id === loggedInUserId : false;
    const deleteReview = () => {
        reviewServices.deleteReview(MY, review._id)
            .then((res) => refresh())
            .catch(errorServices.alertError);

    }
    const navigate = useNavigate();
    const goToMovieDetails = (movie) => {
        navigate('/movies/' + movie.id);
    }
    return (
        <div className={"row d-flex justify-content-between bg-light border p-0"}>
            <div className="col-12 bg-light">
                <div className="row p-3">
                    <div className="col-2 align-self-start pt-2" onClick={() => goToMovieDetails(review.movie)}>
                        <img
                            src={`${review.movie && review.movie.poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342/${review.movie.poster_path}` : ""}`}
                            className="img-fluid" alt="Poster Not Found"/>
                    </div>
                    <div className="col-10">
                        <div className={"row m-0 align-self-center justify-content-between"}>
                            <h5 className="col p-1">{review.movie && review.movie.title}</h5>
                            <div className="col-1">
                                {
                                    isMyReview && allowDelete &&
                                    <button className={"btn btn-danger"}
                                            onClick={deleteReview}>Delete</button>
                                }
                            </div>
                        </div>
                        <h6 className="text-muted p-1 ">Rating: {review.rating}/10</h6>
                        <p className=" p-1">{review.review}</p>
                    </div>
                </div>
            </div>
        </div>

    )
};
export default ReviewItem;