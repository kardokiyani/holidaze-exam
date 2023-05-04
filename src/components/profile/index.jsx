import React, { useState, useEffect } from "react";

import HandleTheLogout from "../logOut";

import { create } from "zustand";

import UpdateAvatar from "../profileUpdateAvatar";

import CreateVenue from "../create";

const API_PROFILE_URL = "https://api.noroff.dev/api/v1/holidaze/profiles/";

export const useTokenStore = create((set) => ({
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
      setToken(storedToken);
      setName(storedName);

      setLoading(true); // Set loading to true before fetching

      const fetchUserProfile = async (token, name) => {
        try {
          const response = await fetch(
            API_PROFILE_URL + encodeURIComponent(name),
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

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

      fetchUserProfile(storedToken, storedName);
    }
  }, [setToken, setName, name]);

  const handleTokenChange = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  if (loading) {
    return <div>Loading the user data...</div>;
  }

  return (
    <div className="profileContentStyle">
      {user && (
        <div>
          {user.avatar || (user.avatar === null && user.avatar) ? (
            <img
              className="profileAvatarImage"
              src={user.avatar}
              alt={`Avatar for ${user.name}`}
            />
          ) : (
            <img className="profileAvatarImage" alt="Default avatar" />
          )}
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <UpdateAvatar name={user.name} />
          <CreateVenue className="createVenueForm" />
          <HandleTheLogout onTokenChange={handleTokenChange} />
        </div>
      )}
    </div>
  );
}

export default Profile;
