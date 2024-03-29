import * as reviewServices from "../../services/reviewServices";
import * as movieServices from "../../services/movieServices";
import {useEffect, useState} from "react";
import * as errorServices from "../../services/errorServices";
import MovieReviewItem from "../MovieReviewItem";
import MovieGallery from "../MovieGallery";
import {useNavigate} from "react-router-dom";
import {MOVIE_DETAIL_URL} from "../../services/utils";

const CATEGORY_ITEMS = {
    "reviews": {"func": reviewServices.findAllReviewsLikedByUserWithMovieDetails},
    "movies": {"func": movieServices.findAllMoviesLikedByUserWithMovieDetails}
}
const Likes = ({uid, allowLike = true, allowDelete = true}) => {
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
        navigate(`${MOVIE_DETAIL_URL}/${movie.id}`);
    }
    useEffect(findItems, [category, uid]);
    return (
        <div className={"row m-3"}>
            <div className={"col-6 col-md-3 ps-3"}>
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
                                <MovieReviewItem key={nth} review={r} refresh={findItems} hasMovieDetail={true} allowDelete={allowDelete} allowLike={allowLike}/>
                            </div>
                        )
                    }
                </div>
                {
                    items && items.length > 0 && category === "movies" &&
                    <MovieGallery movies={items} posterOnClickHandler={goToMovieDetails} refresh={findItems} allowLike={allowLike}/>
                }
            </div>
        </div>
    )
};
export default Likes;