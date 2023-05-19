import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

export const API_UPDATE_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

function UpdateVenue() {
  const { id } = useParams();
  const [media, setMedia] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [venue, setVenue] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true); // Setting isLoading to true when fetching data
      setIsError(false); // Reset isError to false
  
      try {
        const response = await fetch(API_UPDATE_URL + `/${id}`);
        const json = await response.json();
        setVenue(json);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false); // Setting isLoading to false after fetching data
      }
    }
  
    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading venue details...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    console.log("Token:", token);

    const updatedVenue = {
      name: venue.name,
      description: venue.description,
      price: parseInt(venue.price),
      maxGuests: parseInt(venue.maxGuests),
      rating: 0,
      meta: venue.meta,
      location: venue.location,
    };

    if (media) {
      updatedVenue.media = [media];
    }

    try {
      console.log(JSON.stringify(updatedVenue));
      const response = await fetch(API_UPDATE_URL + `/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedVenue),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    if (type === "checkbox") {
      setVenue((prevState) => ({
        ...prevState,
        meta: { ...prevState.meta, [name]: checked },
      }));
    } else if (name.startsWith("location")) {
      const locationKey = name.split(".")[1];
      setVenue((prevState) => ({
        ...prevState,
        location: { ...prevState.location, [locationKey]: value },
      }));
    } else {
      setVenue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleMediaChange = (event) => {
    setMedia(event.target.value);
  };

  return (
    <div className="container">
      <h2>Edit venue:</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Title:</label>
          <input
            type="text"
            className="form-control mt-1"
            id="name"
            name="name"
            value={venue.name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="description  mt-1">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={venue.description || ""}
            onChange={handleChange}
            rows="5"
          />
        </div>
        <div className="form-group  mt-2">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            className="form-control  mt-1"
            id="price"
            name="price"
            value={venue.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="maxGuests">Max Guests:</label>
          <input
            type="number"
            className="form-control mt-1"
            id="maxGuests"
            name="maxGuests"
            value={venue.maxGuests || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group  mt-2">
          <label htmlFor="wifi">Wi-Fi:</label>
          <input
            type="checkbox"
            className="form-check-input  mx-2"
            id="wifi"
            name="wifi"
            checked={venue.meta.wifi || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="parking">Parking:</label>
          <input
            type="checkbox"
            className="form-check-input mx-2"
            id="parking"
            name="parking"
            checked={venue.meta.parking || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="breakfast">Breakfast:</label>
          <input
            type="checkbox"
            className="form-check-input  mx-2"
            id="breakfast"
            name="breakfast"
            checked={venue.meta.breakfast || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="pets">Pets:</label>
          <input
            type="checkbox"
            className="form-check-input  mx-2"
            id="pets"
            name="pets"
            checked={venue.meta.pets || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-5">
          <label htmlFor="location.address">Address:</label>
          <input
            type="text"
            className="form-control  mt-1"
            id="location.address"
            name="location.address"
            value={venue.location.address || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="location.city">City:</label>
          <input
            type="text"
            className="form-control  mt-1"
            id="location.city"
            name="location.city"
            value={venue.location.city || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="location.zip">Zip:</label>
          <input
            type="text"
            className="form-control mt-1"
            id="location.zip"
            name="location.zip"
            value={venue.location.zip || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="location.country">Country:</label>
          <input
            type="text"
            className="form-control mt-1"
            id="location.country"
            name="location.country"
            value={venue.location.country || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mt-2">
          <label htmlFor="mediaUrl">Media URL:</label>
          <input
            type="text"
            className="form-control mt-1"
            id="mediaUrl"
            name="mediaUrl"
            value={media || ""}
            onChange={handleMediaChange}
            pattern="https?://.+"
            title="Please enter a valid URL starting with http:// or https://"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4"
          style={{ maxWidth: "1200px", margin: "auto" }}
        >
          Edit Venue
        </button>
      </form>
    </div>
  );
}

export default UpdateVenue;
