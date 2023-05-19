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
        `${API_UPCOMING_BOOKINGS_URL}${name}/bookings?_venue=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log("bookings", data);
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
      <div className="venuesContainer">
        {bookings.map((booking) => (
          <li key={booking.id}>
            <div className="venue">
              <h3>{booking.venue.name}</h3>
              <img
                src={booking.venue.media}
                alt={booking.venue.name}
                className="venueImage"
              />
              <p>{booking.venue.description}</p>
              <p>Price: {booking.venue.price}$</p>
              <p>Rating: {booking.venue.rating}</p>
              <p>Max Guests: {booking.venue.maxGuests}</p>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default UpcomingBookings;
