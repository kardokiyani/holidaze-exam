import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import HandleTheLogout from "../logOut";

const API_PROFILE_URL = "https://api.noroff.dev/api/v1/holidaze/profiles/";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        const name = localStorage.getItem("name");
        console.log(API_PROFILE_URL + name);
        const response = await fetch(API_PROFILE_URL, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        console.log("response:", response);
        console.log("storedToken:", storedToken);
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
    fetchUser();
  }, []);

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
          <HandleTheLogout />
        </div>
      )}
    </div>
  );
}

export default Profile;
