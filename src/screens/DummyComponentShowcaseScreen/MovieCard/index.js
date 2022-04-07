import React from "react";
import "./index.css";

const MovieCard = () => {
  return (
    <>
      <div className="col-5 col-md-4 col-lg-3 col-xl-2 col-xxl-2">
        <div className="card pc-card-block pc-card-extra">
          <div className="pc-image-container">
            <img
              src="https://i.ibb.co/gmq19DN/random.jpg"
              className="img-fluid w-100"
              alt="..."
            />
          </div>
          <div>
            <div className="mt-2 pc-card-movie-title fw-bold d-flex ps-3">
              Movie Name
            </div>
            <div className="d-flex justify-content-between pc-card-movie-content">
              <div className="ps-3">Nov 24, 2021</div>
              <div className="pe-3">
                <i className="fas fa-star"></i>
                <span className="ps-1">x/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
