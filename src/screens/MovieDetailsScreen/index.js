import {useParams} from "react-router-dom";

const MovieDetailsScreen = () => {
    let params = useParams();
    return (
        <div>
            Movie details of {params.mid ? params.mid : ""}
        </div>
    )
};
export default MovieDetailsScreen;