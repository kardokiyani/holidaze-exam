import React, { useState, useEffect } from "react";

import { API_BASE, API_BOOKINGS, API_VENUE } from "../ApiEndpoints";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function CalenderBooking({ venueId }) {
  const [formData, setFormData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [bookedDates, setBookedDates] = useState([]);
  const [maxCheckOutDate, setMaxCheckOutDate] = useState(null);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!venueId) {
          return; // If venueId is undefined, exit the function to prevent the API request
        }
        const response = await fetch(
          API_BASE + API_VENUE + `/${venueId}?_bookings=true&_owner=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const bookedData = await response.json();
          bookedData.bookings.sort(
            (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom)
          );
          setBookedDates(bookedData.bookings);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchBookedDates();
  }, [venueId]);

  const handleCheckInChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateFrom: date,
    }));

    const nextBookedDate = bookedDates.find(
      (booking) => new Date(booking.dateFrom) > date
    );

    if (nextBookedDate) {
      setMaxCheckOutDate(new Date(nextBookedDate.dateFrom));
    } else {
      setMaxCheckOutDate(null);
    }
  };

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

    console.log("Booking information:", bookingData);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(API_BASE + API_BOOKINGS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setSuccessMessage("BOOKING SUCCESSFUL!");
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
    <form onSubmit={handleSubmit}>
      <h2>Book now:</h2>
      <div className="form-group mt-3">
        <label htmlFor="dateFrom">Check In:</label>
        <DatePicker
          selected={formData.dateFrom}
          minDate={new Date()}
          excludeDates={bookedDates.map(
            (booking) => new Date(booking.dateFrom)
          )}
          onChange={handleCheckInChange}
          className="form-control input-width"
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="dateTo">Check Out:</label>
        <DatePicker
          selected={formData.dateTo}
          excludeDates={bookedDates.map(
            (booking) => new Date(booking.dateFrom)
          )}
          minDate={formData.dateFrom || new Date()}
          maxDate={maxCheckOutDate}
          onChange={(date) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              dateTo: date,
            }))
          }
          className="form-control input-width"
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="guests">Guests:</label>
        <input
          type="number"
          className="form-control input-width"
          id="guests"
          name="guests"
          value={Number.isInteger(formData.guests) ? formData.guests : ""}
          onChange={handleInputChange}
          required
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary main-btn-color mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Book Now"}
      </button>
      {isError && (
        <div className="alert alert-danger mt-3" role="alert">
          BOOKING FAILED, TRY AGAIN
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

export default CalenderBooking;
