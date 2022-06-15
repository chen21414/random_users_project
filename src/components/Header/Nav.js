import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  function Links() {
    return (
      <>
        <button
          onClick={() => navigate("/Users")}
          className="block pr-7 hover:animate-bounce"
        >
          USERS
        </button>
        <button className="block pr-7" onClick={()=>window.scroll(600, 1250)}>PRODUCTS</button>
        <button className="block pr-7" onClick={()=>window.scroll(600, 1250)}>CONTACT</button>
        <button className="block pr-2" onClick={()=>window.scroll(600, 1250)}>ABOUT</button>
      </>
    );
  }

  return (
    <nav>
      <div className="hidden sm:flex">
        <Links />
      </div>
      <div className="sm:hidden relative">
        <div className="text-white">
          <button className="btn-icon" onClick={() => setShowMenu(!showMenu)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {showMenu && (
          <div className="absolute top-10 right-0 z-50 bg-blue-900 shadow-xl rounded p-2">
            <Links />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
