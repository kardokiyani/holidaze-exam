import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
  const [bookedDates, setBookedDates] = useState([]);

  // Load booked dates from local storage on component mount
  useEffect(() => {
    const storedDates = localStorage.getItem("bookedDates");
    if (storedDates) {
      setBookedDates(JSON.parse(storedDates));
    }
  }, []);

  // Update booked dates in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookedDates", JSON.stringify(bookedDates));
  }, [bookedDates]);

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

        // Update bookedDates state with the booked range
        const bookedRange = {
          from: new Date(formData.dateFrom),
          to: new Date(formData.dateTo),
        };
        setBookedDates((prevBookedDates) => [...prevBookedDates, bookedRange]);
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

  const excludeDates = bookedDates
    .map((bookedRange) => {
      // Convert booked range to an array of dates
      const dates = [];
      const currentDate = new Date(bookedRange.from);
      while (currentDate <= bookedRange.to) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
    })
    .flat();

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "1200px", margin: "auto" }}
    >
      <div className="form-group mt-3">
        <h2>Book now:</h2>
        <label htmlFor="dateFrom">Check In:</label>
        <Calendar
          name="dateFrom"
          value={formData.dateFrom}
          onChange={(date) =>
            handleInputChange({ target: { name: "dateFrom", value: date } })
          }
          required
          minDate={new Date()}
          tileDisabled={({ activeStartDate, date, view }) =>
            view === "month" &&
            (excludeDates.some((excludedDate) =>
              isSameDay(new Date(excludedDate), date)
            ) ||
              bookedDates.some(
                (bookedRange) =>
                  date >= bookedRange.from && date <= bookedRange.to
              ))
          }
        />
      </div>
      <div className="form-group mt-2">
        <label htmlFor="dateTo">Check Out:</label>
        <Calendar
          name="dateTo"
          value={formData.dateTo}
          onChange={(date) =>
            handleInputChange({ target: { name: "dateTo", value: date } })
          }
          required
          minDate={new Date()}
          tileDisabled={({ activeStartDate, date, view }) =>
            view === "month" &&
            (excludeDates.some((excludedDate) =>
              isSameDay(new Date(excludedDate), date)
            ) ||
              bookedDates.some(
                (bookedRange) =>
                  date >= bookedRange.from && date <= bookedRange.to
              ))
          }
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
