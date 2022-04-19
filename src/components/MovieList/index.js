import MovieListItem from "../MovieListItem";
import { useState } from "react";
import MovieGallery from "../MovieGallery";
import {Route, useNavigate, Routes} from "react-router-dom";


const MovieList = ({
                       lists = [{
                           _id: "1",
                           listName: "My List",
                           movies: []
                       }]
                   }) => {
    const navigate = useNavigate();
    const [listDetails, setListDetails] = useState({});
    const listClickHandler = (list) => {
        setListDetails(list);
        navigate("details");
    }
    const goBackClickHandler = () => {
        setListDetails({});
        navigate("/profile/s/lists")
    }
    const posterOnClickHandler = (movie) => {
        navigate('/movies/'+movie.id)
    }
    return (
        <div className="row g-2 mt-4 mb-4">
            <Routes>
                <Route index element={
                    <>
                        {lists && lists.map(l => <MovieListItem key={l._id} list={l}
                                                                onClickHandler={listClickHandler}/>)}
                    </>
                }/>
                <Route path={"details"} element={
                    <>
                        <div className="fs-4 m-3" onClick={goBackClickHandler}>
                            <i className="fas fa-angle-left"/>
                            <span className="align-items-center ps-2">Go Back</span></div>
                        <MovieGallery movies={listDetails.movies} posterOnClickHandler={posterOnClickHandler}/>
                    </>
                }/>
            </Routes>
        </div>
    )
};
export default MovieList;
