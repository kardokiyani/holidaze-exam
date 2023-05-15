import React from "react";

const DeleteVenue = ({ id }) => {
  const API_DELETE_VENUE_URL =
    "https://api.noroff.dev/api/v1/holidaze/venues/" + id;

  const fetchVenues = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_DELETE_VENUE_URL}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if the response is empty
      if (response.status === 204) {
        console.log("Venue deleted successfully");
        return;
      }

      // Check if the response is valid JSON
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Error with deleting venue:", response.statusText);
      }
    } catch (error) {
      console.error("Error with deleting venue:", error);
    }
  };

  return (
    <button
      className="btn btn-primary mt-4"
      onClick={fetchVenues}
      style={{ maxWidth: "1200px", margin: "auto" }}
    >
      Delete Venue
    </button>
  );
};

export default DeleteVenue;
