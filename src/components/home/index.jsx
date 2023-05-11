import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

export const API_BASE_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

function GetVenues() {
  const [venues, setVenues] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        setVenues(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVenues();
  }, []);

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchInput.toLowerCase())
  );

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
      </div>
      <div className="venuesContainer">
        {filteredVenues.map((venue) => (
          <Link
            key={venue.id}
            to={`/venue/${venue.id}`}
            className="venueLink"
          >
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
    </div>
  );  
}

export default GetVenues;
