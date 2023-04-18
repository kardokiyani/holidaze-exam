import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const API_BASE_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

function GetVenues() {
  const [venues, setVenues] = useState([]);

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

  return (
    <div>
      {venues.map((venue) => (
        <div key={venue.id}>
          <h2>{venue.name}</h2>
          <img src={venue.media} alt={venue.name} className="venueImage" />
          <p>{venue.description}</p>
          <p>{venue.price}</p>
          <Link to={`/venue/${venue.id}`}>View details</Link>
        </div>
      ))}
    </div>
  );
}

export default GetVenues;
