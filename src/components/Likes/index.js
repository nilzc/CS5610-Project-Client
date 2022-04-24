import * as reviewServices from "../../services/reviewServices";
import * as movieServices from "../../services/movieServices";
import * as listServices from "../../services/listServices";
import {useEffect, useState} from "react";
import * as errorServices from "../../services/errorServices";
import MovieListItem from "../MovieListItem";
import MovieReviewItem from "../MovieReviewItem";
import MovieGallery from "../MovieGallery";
import {useNavigate} from "react-router-dom";

const CATEGORY_ITEMS = {
    "reviews": {"func": reviewServices.findAllReviewsLikedByUserWithMovieDetails},
    "movies": {"func": movieServices.findAllMoviesLikedByUserWithMovieDetails}
}
const Likes = ({uid, showPrivate}) => {
    const [category, setCategory] = useState("movies")
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const findItems = () => {
        if (category && uid) {
            CATEGORY_ITEMS[category].func(uid)
                .then(rs => setItems(rs))
                .catch(errorServices.alertError);
        }
    }
    const goToMovieDetails = (movie) => {
        navigate(`/movies/${movie.id}`);
    }
    useEffect(findItems, [category, uid]);
    return (
        <div className={"row m-3"}>
            <div className={"col-3 ps-4"}>
                <select className="form-select form-select mb-3"
                        onChange={(e) => setCategory(e.target.value)}>
                    <option value="movies">Movies</option>
                    <option value="reviews">Reviews</option>
                </select>
            </div>
            <div className={"col-12"}>
                <div className={"row m-0 p-2 pt-3"}>
                    {
                        items && items.length > 0 && category === "reviews" &&
                        items.map((r, nth) =>
                            <div key={nth + "div"} className={"col-12"}>
                                <MovieReviewItem key={nth} review={r} refresh={findItems} hasMovieDetail={true} showPrivate={showPrivate}/>
                            </div>
                        )
                    }
                </div>
                <div className={"row m-0"}>
                    {
                        items && items.length > 0 && category === "movies" &&
                        <MovieGallery movieLikeBadge={true} movies={items} posterOnClickHandler={goToMovieDetails} refresh={findItems} showPrivate={showPrivate}/>
                    }
                </div>
            </div>
        </div>
    )
};
export default Likes;