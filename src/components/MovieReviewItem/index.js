import {useSelector} from "react-redux";
import {getUserId} from "../../redux/selectors";
import * as reviewServices from "../../services/reviewServices";
import * as errorServices from "../../services/errorServices";
import { useLocation, useNavigate } from "react-router-dom";
import MyListItem from "../MyListItem";
import MyListReviewItem from "../MyListReviewItem";
import {MY} from "../../services/utils";


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
                    <MyListItem review={review} onClickNavigate={onClickNavigate} isMyReview={isMyReview} deleteReview={deleteReview}/>
                }
                {location.pathname !== '/profile/s/reviews' && 
                    <MyListReviewItem  review={review} isMyReview={isMyReview} deleteReview={deleteReview}/>
                }
                </div>
            </div>
    )
};
export default MovieReviewItem;