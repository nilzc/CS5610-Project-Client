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
        <div className={"row d-flex flex-row justify-content-between bg-light list-group-item p-0"}>
            {/*{*/}
            {/*    review.movie &&*/}
            {/*    <div className={"col-1 bg-light"}>*/}
            {/*        <MovieItem movie={review.movie} posterOnClickHandler={() => {}}/>*/}
            {/*    </div>*/}
            {/*}*/}
            <div className="col-12 card border-0 bg-light">
                <div className="card-body d-flex justify-content-between">
                {location.pathname === '/profile/s/reviews' && <div className="row" onClick={() => onClickNavigate(review.movie)}>
                        <div className="col-4">
                            <img src={`${review.movie.poster_path ? `${process.env.REACT_APP_MOVIE_BASE_URL}/w342/${review.movie.poster_path}` : ""}`} className="img-fluid" alt="Poster Not Found" />
                        </div>
                        <div className="col-8">
                        <h5 className="card-title p-1">{review.movie.original_title}</h5> 
                        <h6 className="card-subtitle text-muted p-1 ">Rating: {review.rating}</h6>
                        <p className="card-text p-1">{review.review}</p>
                        </div>
                    </div>}
                    {location.pathname !== '/profile/s/reviews' && <div>
                        <div>
                        <h5 className="card-title p-1">Written by <span className="text-success fw-bold"><u>{review.postedBy.username}</u>
                        </span> on {new Date(review.createdOn).toString().split(' ').slice(1,3).join(' ')}, {new Date(review.createdOn).getFullYear()}</h5>
                        <p className="card-text p-1">{review.review}</p>
                        <h6 className="card-subtitle text-muted p-1 ">Rating: {review.rating}</h6>
                        </div>
                    </div>}
                    <div>
                        {
                            isMyReview &&
                            <button className={"btn btn-danger"}
                                    onClick={deleteReview}>Delete</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};
export default MovieReviewItem;