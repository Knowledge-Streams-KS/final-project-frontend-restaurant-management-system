import React from "react";
import Lottie from "lottie-react";
import animationData from "./tick_animation.json"; // Save your animation JSON data as tick-animation.json

const TickAnimation = () => {
  return (
    <div style={{ width: 200, height: 200 }}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default TickAnimation;
