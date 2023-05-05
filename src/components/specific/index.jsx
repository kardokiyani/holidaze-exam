import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";

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
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

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
      <div className="datePickerContainer">
        <label>Check-in</label>
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          selectsStart
          startDate={checkInDate}
          endDate={checkOutDate}
          dateFormat="dd/MM/yyyy"
        />
        <label>Check-out</label>
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          selectsEnd
          startDate={checkInDate}
          endDate={checkOutDate}
          minDate={checkInDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <GetBooking />
    </div>
  );
}

export default GetVenueSpecific;
