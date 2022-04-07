import React from "react";
import MovieCard from "../MovieCard";
import "./index.css";

const MovieScroll = () => {
  return (
    <>
      <div className="scrolling-wrapper row flex-row flex-nowrap mt-4 pb-4 pt-2">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </>
  );
};

export default MovieScroll;
