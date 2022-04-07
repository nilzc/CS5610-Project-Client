import React from "react";
import "./index.css";
import SearchBar from "../SearchBar";
const SearchComponent = () => {
  return (
    <>
      <header class="pcsc-header text-white text-center">
        <div class="container">
          <div class="row">
            <div class="col-8 col-xl-9 mx-auto">
              <h1 class="mb-4 pcsc-h1">Welcome.</h1>
              <h1 class="pcsc-h1-summary">
                All your favourite movies here in one place.
              </h1>
              <SearchBar />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default SearchComponent;
