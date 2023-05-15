import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

export const API_BASE_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

function GetVenues() {
  const [venues, setVenues] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 100;

  useEffect(() => {
    fetchVenues();
  }, [sortField, sortOrder, currentPage]);

  async function fetchVenues() {
    try {
      const response = await fetch(
        `${API_BASE_URL}?sort=${sortField}&sortOrder=${sortOrder}&_page=${currentPage}&_limit=${pageSize}`
      );
      const data = await response.json();
      setVenues(data);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSortChange = (e) => {
    const { value } = e.target;
    const [field, order] = value.split("-");
    setSortField(field);
    setSortOrder(order);
    setCurrentPage(currentPage + 1);
  };

  const handlePageChange = (increment) => {
    setCurrentPage(currentPage + increment);
    if (currentPage === 1 && increment === -1) {
      setCurrentPage(1);
    }
  };
  
  return (
    <div>
      <div className="searchContainer">
        <input
          className="searchInputStyle"
          type="text"
          placeholder="Search venues"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select value={`${sortField}-${sortOrder}`} onChange={handleSortChange}>
          <option value="name-desc">Sort by Name (Descending)</option>
          <option value="name-asc">Sort by Name (Ascending)</option>
        </select>
      </div>
      <div className="venuesContainer">
        {filteredVenues.map((venue) => (
          <Link key={venue.id} to={`/venue/${venue.id}`} className="venueLink">
            <div className="venue">
              <h2>{venue.name}</h2>
              <img src={venue.media} alt={venue.name} className="venueImage" />
              <p>{venue.description}</p>
              <p>Price: {venue.price}$</p>
              <p>Rating: {venue.rating}</p>
              <p>Max Guests: {venue.maxGuests}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination */}
      <div className="pagination">
        <button
          className="btn btn-primary mt-4"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(-1)}
        >
          Previous Page
        </button>
        <button
          className="btn btn-primary mt-4"
          onClick={() => handlePageChange(1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default GetVenues;
