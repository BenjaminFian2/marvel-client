import "./NavBar.css";

import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";

const NavBar = ({ tokenId, setSearch }) => {
  const location = useLocation();

  console.log(location);

  return (
    <div className="NavBar">
      <nav>
        <ul>
          <li>
            <Link
              className={location.pathname === "/" ? "active" : ""}
              to={"/"}
              onClick={() => {
                setSearch("");
              }}
            >
              Characters
            </Link>
          </li>
          <li>
            <Link
              className={location.pathname === "/comics" ? "active" : ""}
              to={"/comics"}
              onClick={() => {
                setSearch("");
              }}
            >
              Comics
            </Link>
          </li>
          {tokenId && (
            <ul>
              Favorites
              <li>
                <Link
                  className={
                    location.pathname === "/favoritesCharacters" ? "active" : ""
                  }
                  to={"/favoritesCharacters"}
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  Favorites characters
                </Link>
              </li>
              <li>
                <Link
                  className={
                    location.pathname === "/favoritesComics" ? "active" : ""
                  }
                  to={"/favoritesComics"}
                  onClick={() => {
                    setSearch("");
                  }}
                >
                  Favorites comics
                </Link>
              </li>
            </ul>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
