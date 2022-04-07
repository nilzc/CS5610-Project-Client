import React from "react";
import "./index.css";

const SearchBar = () => {
  return (
    <>
      <div className="row justify-content-sm-center">
        <div className="form-group col-12 col-md-9">
          <input
            id="searchInput1"
            type="text"
            placeholder="Search For Movie, TV Shows, Actors ..."
            className="form-control form-control-underlined"
          />
        </div>
        <div className="form-group col-8 col-md-3 mt-3 mt-md-0">
          <button
            type="submit"
            className="btn btn-primary rounded-pill btn-block shadow-sm w-100 fw-bold"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
