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
        <div className={"row d-flex flex-row justify-content-between bg-light list-group-item p-0"}>
            {/*{*/}
            {/*    review.movie &&*/}
            {/*    <div className={"col-1 bg-light"}>*/}
            {/*        <MovieItem movie={review.movie} posterOnClickHandler={() => {}}/>*/}
            {/*    </div>*/}
            {/*}*/}
            <div className="col-12 card border-0 bg-light">
                <div className="card-body d-flex justify-content-between">
                    <div>
                        <h5 className="card-title p-1">User: {review.postedBy.username}</h5>
                        <h6 className="card-subtitle text-muted p-1 ">Rating: {review.rating}</h6>
                        <p className="card-text p-1">{review.review}</p>
                    </div>
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