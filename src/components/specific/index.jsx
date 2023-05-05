import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import GetBooking from "../bookings";

const API_SPECIFIC_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

function GetVenueSpecific() {
  const { id } = useParams();
  const [venue, setVenue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const url = API_SPECIFIC_URL;

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(`${url}/${id}`);
        const json = await response.json();
        setVenue(json);
        setIsLoading(false);
        console.log("Venue data loaded:", json);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.error("Error loading venue data:", error);
      }
    }

    getData();
  }, [id]);

  if (isLoading) {
    return <div>Loading venue details...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <h2>{venue.name}</h2>
      <img src={venue.media} alt={venue.name} className="venuesImage" />
      <p>{venue.description}</p>
      <p>{venue.price}</p>
      <GetBooking venueId={venue.id} />
    </div>
  );
}

export default GetVenueSpecific;
