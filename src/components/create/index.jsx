import React, { useState } from "react";

export const API_BASE_URL = "https://api.noroff.dev/api/v1/holidaze/venues";

function CreateVenue() {
  const [venue, setVenue] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 0,
    rating: 0,
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

  const [mediaUrl, setMediaUrl] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newVenue = {
      name: venue.name,
      description: venue.description,
      media: mediaUrl ? [mediaUrl] : [], // include the media URL in the newVenue object
      price: parseInt(venue.price),
      maxGuests: parseInt(venue.maxGuests), // Make sure maxGuests is a number
      rating: 0,
      meta: venue.meta,
      location: venue.location,
    };
    const token = localStorage.getItem("accessToken");
    console.log("Token:", token);
    fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newVenue),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
    setMediaUrl(event.target.value);
  };

  return (
    <div>
      <h2>Create a new Venue</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={venue.name}
            onChange={(event) =>
              setVenue({ ...venue, name: event.target.value })
            }
          />

          <textarea
            id="description"
            value={venue.description}
            onChange={(event) =>
              setVenue({ ...venue, description: event.target.value })
            }
          />

          <input
            type="text"
            id="media"
            value={mediaUrl}
            onChange={handleMediaChange}
          />

          <input
            type="number"
            id="price"
            value={venue.price}
            onChange={(event) =>
              setVenue({ ...venue, price: parseFloat(event.target.value) })
            }
          />

          <input
            type="number"
            id="maxGuests"
            value={venue.maxGuests}
            onChange={(event) =>
              setVenue({ ...venue, maxGuests: parseInt(event.target.value) })
            }
          />

          <input
            type="number"
            id="rating"
            value={venue.rating}
            onChange={(event) =>
              setVenue({ ...venue, rating: parseInt(event.target.value) })
            }
          />
        </div>
        <button type="submit">Create Venue</button>
      </form>
    </div>
  );
}

export default CreateVenue;
