import React from "react";
import "./index.css";
import Game from "../components/Game";

const Main = () => {
  return (
    <div className="mainBox">
      <div className="mainBox__detail">
        <Game />
      </div>
    </div>
  );
};

export default Main;
