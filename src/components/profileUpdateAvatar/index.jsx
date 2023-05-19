import { useState } from "react";

import { useTokenStore } from "../profile";

function UpdateAvatar({ name }) {
  const { token } = useTokenStore();
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const avatarValue = formData.get("avatar");

    // Variables for request
    const Url = "https://api.noroff.dev/api/v1/holidaze/profiles";
    const endPoint = `/${name}/media`;
    const body = { avatar: avatarValue };

    fetch(Url + endPoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful response from API
        console.log(data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        setError(error);
        setErrorMessage("");
      });
  };

  return (
    <div>
      <h2>Update Avatar</h2>
      {errorMessage && <div>{errorMessage}</div>}
      {error instanceof Error && <div>{error.toString()}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Avatar URL:
          <input name="avatar" type="url" />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateAvatar;
