import MovieReviewItem from "../MovieReviewItem";

const MovieReviews = ({reviews=[], refresh}) => {
    return (
        <div className={"row m-3"}>
            {
                reviews.length > 0 &&
                reviews.map((r, nth) =>
                    <div key={nth + "div"} className={"col-12 list-group"}>
                        <MovieReviewItem key={nth} review={r} refresh={refresh}/>
                    </div>
                )
            }
        </div>
    )
};
export default MovieReviews;