import React from "react";
import { useNavigate } from "react-router-dom";
import ImageOne from "../../images/rcnlogo.png";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate("/")}>
      <img
        src={ImageOne}
        alt="robert"
        className="h-11 rounded shadow cursor-pointer"
      />
    </div>
  );
};

export default Logo;
