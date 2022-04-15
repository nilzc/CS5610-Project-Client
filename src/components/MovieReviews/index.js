import MovieReviewItem from "../MovieReviewItem";

const MovieReviews = ({reviews=[]}) => {
    return (
        <div>
            {
                reviews.length > 0 &&
                reviews.map((r, nth) =>
                    <MovieReviewItem key={nth} review={r}/>)
            }
        </div>
    )
};
export default MovieReviews;