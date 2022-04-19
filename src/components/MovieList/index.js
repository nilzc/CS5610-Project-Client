import MovieListItem from "../MovieListItem";
import { useState } from "react";
import MovieGallery from "../MovieGallery";
import { useNavigate } from "react-router-dom";


const MovieList = ({
                       lists = [{
                           _id: "1",
                           listName: "My List",
                           movies: []
                       }]
                   }) => {
    const [showListDetails, setShowListDetails] = useState(false);
    const [listDetails, setListDetails] = useState({});
    const listClickHandler = (list) => {
        setShowListDetails(true);
        setListDetails(list);
    }
    const goBackClickHandler = () => {
        setShowListDetails(false);
        setListDetails({});
    }
    const navigate = useNavigate();
    const posterOnClickHandler = (li) => {
        navigate('/details/'+li.id)
    }
    return (
        <>
        
            { !showListDetails && 
            <div className="row g-2 mt-4 mb-4">
                {lists && lists.map(l => <MovieListItem key={l._id} list={l} onClickHandler={listClickHandler}/>)}
            </div>
            }
            {
            showListDetails &&
            <>
            <div className="fs-4 mb-2" onClick={goBackClickHandler}><i class="fas fa-angle-left"></i> <span className="align-items-center">Go Back</span></div>
            <MovieGallery movies={listDetails.movies} posterOnClickHandler={posterOnClickHandler}/>
            </>
            }
        
        </>
    )
};
export default MovieList;
