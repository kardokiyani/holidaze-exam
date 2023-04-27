import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

const API_BOOKINGS_URL = "https://api.noroff.dev/api/v1/holidaze/bookings";

function GetBooking() {
  const { id } = useParams();
  const [venue, setVenue] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const token = "your-authentication-token"; // Replace with your actual token
        const response = await fetch(`${API_BOOKINGS_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  return <div></div>;
}

export default GetBooking;
