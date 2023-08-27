import React from "react";

function Search({searchValue, onChangeSetSearchValue}) {

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchValue}
        onChange={(e) => onChangeSetSearchValue(e.target.value)}
      />
    </div>
  );
}

export default Search;
