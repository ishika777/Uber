import React from "react";
import "./BlueBackgroundAnimation.css";

const BlueBackgroundAnimation = ({children}) => {
  return (
    <div className="background-container">
        <div className="z-10">
            {children}
        </div>
    </div>
  );
};

export default BlueBackgroundAnimation;
