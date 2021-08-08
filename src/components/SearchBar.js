import "./SearchBar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="SearchBar">
      <input
        value={search}
        type="text"
        placeholder="Search"
        className="SearchBar-input"
        onChange={(event) => {
          setSearch(event.target.value);
          // setPage(1);
          // setNumItems(5);
        }}
      />
      <FontAwesomeIcon
        icon="search"
        color="#bbb"
        className="SearchBar-icon-search"
      />
    </div>
  );
};

export default SearchBar;
