import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const API_PROFILE_URL =
  "https://api.noroff.dev/api/v1/holidaze/profiles/aAyETtBgER7WQCEy/media";

const TOKEN = "your-bearer-token";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  async function fetchProfile() {
    try {
      const response = await fetch(API_PROFILE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          name: "updated name",
          email: "updated email",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const data = await response.json();
      setProfile(data);
      setLoading(false);

      const newToken = response.headers.get("Authorization");
      setToken(newToken);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {profile && (
        <div>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
          <Link to={`/profiles/${profile.id}`}>Edit Profile</Link>
        </div>
      )}
    </div>
  );
}

export default Profile;
