import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import HandleTheLogout from "../logOut";

import { create } from "zustand";

const API_PROFILE_URL = "https://api.noroff.dev/api/v1/holidaze/profiles/";

const useTokenStore = create((set) => ({
  token: localStorage.getItem("token"),
  setToken: (token) => set({ token }),
}));

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, setToken } = useTokenStore();
  const [name, setName] = useState(localStorage.getItem("name") || "");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");

    if (storedToken && storedName) {
      setToken(JSON.parse(storedToken));
      setName(storedName);
    }

    if (storedToken && storedName) {
      fetchUserProfile(storedToken, storedName);
    }
  }, []);

  const fetchUserProfile = async (token, name) => {
    if (!token || !name) {
      return;
    }

    try {
      const response = await fetch(API_PROFILE_URL + name, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
      setLoading(false);
      console.log("Profile data loaded:", data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleTokenChange = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  if (!user) {
    return <div>Loading the user data...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {user && (
        <div>
          {user.avatar ? (
            <img
              className="rounded-image"
              src={user.avatar}
              alt={`Avatar for ${user.name}`}
            />
          ) : (
            <img className="rounded-image" alt="Default avatar" />
          )}
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <Link to={`/profiles/${user.id}`}>Edit Profile</Link>
          <HandleTheLogout onTokenChange={handleTokenChange} />
        </div>
      )}
    </div>
  );
}

export default Profile;
