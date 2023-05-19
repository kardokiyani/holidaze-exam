import React, { useState } from "react";

import { API_BASE, API_BOOKINGS } from "../ApiEndpoints";

export function GetBooking({ venueId }) {
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "guests" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setSuccessMessage("");

    const bookingData = {
      ...formData,
      venueId: venueId,
    };

    console.log("Booking data:", bookingData);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(API_BASE + API_BOOKINGS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
        Authorization: `Bearer ${token}`,
      });

      if (response.ok) {
        setSuccessMessage("Booking successful!");
        setFormData({
          dateFrom: "",
          dateTo: "",
          guests: 1,
        });
      } else {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        setIsError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsError(true);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "1200px", margin: "auto" }}>
  <div className="form-group mt-3">
    <h2>Book now:</h2>
    <label htmlFor="dateFrom">Check In:</label>
    <input
      type="date"
      className="form-control form-control-sm"
      id="dateFrom"
      name="dateFrom"
      value={formData.dateFrom}
      onChange={handleInputChange}
      required
    />
  </div>
  <div className="form-group mt-2">
    <label htmlFor="dateTo">Check Out:</label>
    <input
      type="date"
      className="form-control form-control-sm"
      id="dateTo"
      name="dateTo"
      value={formData.dateTo}
      onChange={handleInputChange}
      required
    />
  </div>
  <div className="form-group mt-2">
    <label htmlFor="guests">Guests:</label>
    <input
      type="number"
      className="form-control form-control-sm"
      id="guests"
      name="guests"
      value={Number.isInteger(formData.guests) ? formData.guests : ""}
      onChange={handleInputChange}
      required
    />
  </div>
  <button
    type="submit"
    className="btn btn-primary mt-4"
    disabled={isSubmitting}
  >
    {isSubmitting ? "Submitting..." : "Book Now"}
  </button>
  {isError && (
    <div className="alert alert-danger mt-3" role="alert">
      There was an error submitting your booking. Please try again later.
    </div>
  )}
  {successMessage && (
    <div className="alert alert-success mt-3" role="alert">
      {successMessage}
    </div>
  )}
</form>

  );
}

export default GetBooking;
