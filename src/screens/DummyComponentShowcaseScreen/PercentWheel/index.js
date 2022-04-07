import React, { useRef, useEffect } from "react";

const Canvas = (props) => {
  const canvasRef = useRef(null);

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  let degrees = props.percentage * 360.0;

  let radians = toRadians(degrees);
  let arcX = props.arcX;
  let arcY = props.arcY;
  let radius = props.radius;
  let startAngle = toRadians(270);
  let endAngle = radians + startAngle;
  let anticlockwise = false;

  useEffect(() => {
    const draw = (ctx) => {
      ctx.beginPath();
      ctx.lineWidth = props.linewidth;
      ctx.strokeStyle = props.color;
      ctx.arc(arcX, arcY, radius, startAngle, endAngle, anticlockwise);
      ctx.stroke();
    };

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    draw(context);
  });

  return <canvas id="arc" ref={canvasRef} {...props} style={{ zIndex: 1 }} />;
};

export default Canvas;
