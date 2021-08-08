import "./Header.css";

import { Link, useHistory } from "react-router-dom";

import logo from "../assets/img/marvel-logo.png";

import SearchBar from "../components/SearchBar";

// import { useState, useEffect } from "react";

const Header = ({ setUser, tokenId, search, setSearch, modals, setModals }) => {
  let history = useHistory();
  return (
    <div className="Header">
      <Link to={"/"}>
        <img src={logo} alt="logo-marvel" />
      </Link>
      <SearchBar search={search} setSearch={setSearch} />
      <div>
        {!tokenId ? (
          <div>
            <button
              className="Header-register-button"
              onClick={() => {
                const tab = [...modals];
                tab[0] = true;
                setModals(tab);
              }}
            >
              Register
            </button>
            <button
              className="Header-login-button"
              onClick={() => {
                const tab = [...modals];
                tab[1] = true;
                setModals(tab);
              }}
            >
              Login
            </button>
          </div>
        ) : (
          <div>
            <button
              className="Header-signout-button"
              onClick={() => {
                history.push(`/`);
                setUser(null);
              }}
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
