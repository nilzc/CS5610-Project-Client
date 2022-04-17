import {useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import {MY} from "../../services/constants";
import MovieItem from "../MovieItem";

const MovieReviewItem = ({
                             review = {
                                 review: "dummy", postedBy: {username: "bob"}},
                             refresh
                         }) => {
    const loggedInUserId = useSelector(getUserId);
    const isMyReview = review.postedBy._id === loggedInUserId;
    const deleteReview = () => {
        reviewServices.deleteReview(MY, review._id)
            .then((res) => refresh())
            .catch(errorServices.alertError);
    }
    return (
        <div className={"row"}>
            {
                review.movie &&
                <div className={"col-2"}>
                    <MovieItem movie={review.movie} posterOnClickHandler={() => {}}/>
                </div>
            }
            <div className="col card">
                <div className="card-body">
                    <h5 className="card-title">User: {review.postedBy.username}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Rating: {review.rating}</h6>
                    <p className="card-text">{review.review}</p>
                    {
                        isMyReview &&
                        <button className={"btn btn-warning"}
                                onClick={deleteReview}>Delete</button>
                    }
                </div>
            </div>
        </div>
    )
};
export default MovieReviewItem;