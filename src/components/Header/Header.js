import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-gradient-to-l from-blue-800 w-full text-white shadow">
      <div className="flex justify-between items-center p-5 font-mono text-xl">
        <div className="flex-grow">
          <Logo />
        </div>
        <div>
          <Nav />
        </div>
      </div>
    </header>
  );
};

export default Header;
