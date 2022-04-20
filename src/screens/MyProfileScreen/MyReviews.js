import MovieReviewItem from "../../components/MovieReviewItem";
import MyReviewItem from "./MyReviewItem";

const MyReviews = ({reviews, refresh}) => {
    return (
        <div className={"row m-3"}>
            {
                reviews.length > 0 &&
                reviews.map((r, nth) =>
                    <div key={nth + "div"} className={"col-12 p-0"}>
                        <MyReviewItem key={nth} review={r} refresh={refresh}/>
                    </div>
                )
            }
        </div>
    )
};
export default MyReviews;