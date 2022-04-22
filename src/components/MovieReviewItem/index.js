import {useSelector} from "react-redux";
import {getProfile, getUserId, isLoggedIn} from "../../redux/selectors";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import {ADMIN, getDate, goToMovieDetails, MY, SUPER} from "../../services/utils";
import React, {useEffect, useState} from "react";
import MovieItem from "../MovieItem";
import {useNavigate} from "react-router-dom";


const MovieReviewItem = ({
                             review = {
                                 review: "dummy", postedBy: {username: "bob"}
                             },
                             refresh, hasMovieDetail=false
                         }) => {
    const loggedIn = useSelector(isLoggedIn);
    const loggedInUserId = useSelector(getUserId);
    const navigate = useNavigate();
    const profile = useSelector(getProfile);
    let isMyReview = review.postedBy && loggedInUserId ? review.postedBy._id === loggedInUserId : false;
    if (profile && (profile.role === ADMIN || profile.role === SUPER)) {
        isMyReview = true;
    }
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
        if (loggedIn && review._id) {
            reviewServices.findUserLikesReview(MY, review._id)
                .then(res => setLiked(!!res))
                .catch(errorServices.alertError);
        } else {
            setLiked(false)
        }
    }
    const goToMovieDetails = (movie) => {
        navigate(`/movies/${movie.id}`);
    }
    useEffect(userAlreadyLikesReview, [loggedIn, review]);
    return (
        <div className={"row justify-content-between bg-light border p-0"}>
            <div className="col-12">
                <div className="row p-2">
                    {
                        hasMovieDetail &&
                        <div className={"col-2 p-2"}>
                            <MovieItem movie={review.movie} posterOnClickHandler={goToMovieDetails}/>
                        </div>
                    }
                    <div className="col">
                        <div className={"row m-0 pt-2 pb-2 justify-content-between"}>
                            <h5 className="col p-1">Written by
                                <span className="text-success fw-bold text-decoration-underline ps-1">
                                    {review.postedBy && review.postedBy.username}
                                </span> on {getDate(review.postedOn)}
                            </h5>
                            <div className="col-2 text-end pe-0">
                                {
                                    isMyReview &&
                                    <button className={"btn btn-danger"}
                                            onClick={deleteReview}>Delete
                                    </button>
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
                                        <i className={`col-6 fa-solid fa-bookmark`} onClick={likeReview}/>
                                    }
                                    {
                                        !liked &&
                                        <i className={`col-6 fa-regular fa-bookmark`} onClick={likeReview}/>
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