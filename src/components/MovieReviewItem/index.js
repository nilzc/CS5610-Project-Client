const MovieReviewItem = ({
                             review = {
                                 review: "dummy", postedBy: {username: "bob"}}}) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">User: {review.postedBy.username}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Rating: {review.rating}</h6>
                <p className="card-text">{review.review}</p>
            </div>
        </div>
    )
};
export default MovieReviewItem;