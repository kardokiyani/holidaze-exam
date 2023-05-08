import React, { useState, useEffect } from "react";

const API_UPCOMING_BOOKINGS_URL =
  "https://api.noroff.dev/api/v1/holidaze/profiles/";

export function UpcomingBookings({ customerId }) {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");
      const response = await fetch(
        `${API_UPCOMING_BOOKINGS_URL}${name}/bookings`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching upcoming bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [customerId]);

  return (
    <div>
      <h2>Upcoming Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <p>Booking ID: {booking.id}</p>
            <p>Check-in: {booking.dateFrom}</p>
            <p>Check-out: {booking.dateTo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingBookings;
