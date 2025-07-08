import React from "react";
import "../style/Button.css"

const ActiveBtn = () => {
  return (
    <div className="video-button">
      <span className="video-button__text">Press any button to start</span>
      <div className="video-button__arrows">
        <div className="arrow"></div>
        <div className="arrow"></div>
      </div>
    </div>
  );
};

export default ActiveBtn;
