import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import HandleTheLogout from "../logOut";

const API_PROFILE_URL = "https://api.noroff.dev/api/v1/holidaze/profiles/";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  // Get the token from local storage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  async function fetchProfile() {
    try {
      const response = await fetch(API_PROFILE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
      setLoading(false);
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
          <h1>Welcome, {profile.name}!</h1>
          <p>Email: {profile.email}</p>
          <p>Credits: {profile.credits}</p>
          <p>Avatar: {profile.avatar}</p>
          <Link to={`/profiles/${profile.id}`}>Edit Profile</Link>
          <HandleTheLogout />
        </div>
      )}
    </div>
  );
}

export default Profile;
