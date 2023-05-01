import { useState } from "react";

import { useTokenStore } from "../profile";

const API_PROFILE_MEDIA_URL =
  "https://api.noroff.dev/api/v1/holidaze/profiles/{id}/media";

function UpdateAvatar() {
  const { token } = useTokenStore();
  const [avatar, setAvatar] = useState({ url: "" });
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(event);

    const storedToken = localStorage.getItem("token");
    const storedId = localStorage.getItem("id");

    if (!storedToken || !storedId) {
      setError("You need to be logged in to update your avatar");
      return;
    }

    try {
      const response = await fetch(
        API_PROFILE_MEDIA_URL.replace("{id}", storedId),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(avatar),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Avatar updated:", data);
      setAvatar({ url: "" }); // Reset the avatar state
    } catch (error) {
      console.error("Error updating avatar:", error);
      setError(error);
      setErrorMessage(error.toString());
    }
  };

  return (
    <div>
      <h2>Update Avatar</h2>
      {errorMessage && <div>{errorMessage}</div>}
      {error instanceof Error && <div>{error.toString()}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Avatar URL:
          <input
            type="text"
            value={avatar.url}
            onChange={(event) =>
              setAvatar({ ...avatar, url: event.target.value })
            }
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateAvatar;
