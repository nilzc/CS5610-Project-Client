import React from "react";
import Canvas from "../PercentWheel";
import "./index.css";
const FullWheel = (props) => {
  return (
    <>
      <div className="pcfw-container">
        <div className="pcfw-back"></div>
        <h2 className="pcfw-number">{props.percentage * 100}%</h2>
        <Canvas
          percentage={props.percentage}
          radius={props.radius}
          arcX={props.arcX}
          arcY={props.arcY}
          linewidth={props.lw}
          color={"rgb(0,125,9)"}
        />
      </div>
    </>
  );
};

export default FullWheel;
