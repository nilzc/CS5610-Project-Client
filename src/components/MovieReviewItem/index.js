import {useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import {MY} from "../../services/constants";
import MovieItem from "../MovieItem";
import { useLocation, useNavigate } from "react-router-dom";

const MovieReviewItem = ({
                             review = {
                                 review: "dummy", postedBy: {username: "bob"}},
                             refresh
                         }) => {
    const loggedInUserId = useSelector(getUserId);
    const isMyReview = review.postedBy._id === loggedInUserId;
    const location = useLocation();
    const deleteReview = () => {
        reviewServices.deleteReview(MY, review._id)
            .then((res) => refresh())
            .catch(errorServices.alertError);
            
    }
    const navigate = useNavigate();
    const onClickNavigate = (movie) => {
        navigate('/movies/'+movie.id);
    }
    return (
        <div className={"row d-flex justify-content-between bg-light list-group-item p-0"}>
            <div className="col-12 border-0 bg-light">
                {location.pathname === '/profile/s/reviews' && 
                <div className="row p-4">
                        <div className="col-2" onClick={() => onClickNavigate(review.movie)}>
                            <img src={`${review.movie.poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342/${review.movie.poster_path}` : ""}`} className="img-fluid" alt="Poster Not Found" />
                        </div>
                        <div className="col-9">
                        <h5 className=" p-1">{review.movie.original_title}</h5> 
                        <h6 className=" text-muted p-1 ">Rating: {review.rating}</h6>
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
                    }
                    {location.pathname !== '/profile/s/reviews' && <div className="row p-2">
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
                    </div>}
                    
                </div>
            </div>
    )
};
export default MovieReviewItem;