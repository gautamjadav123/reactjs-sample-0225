// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/id/${randomId}/info`)
      .then((res) => res.json())
      .then((data) => setProfile(data));
  }, []);

  return (
    <div>
      <Header />
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        {profile ? (
          <div>
            <img
              src={profile.download_url}
              alt="Profile"
              className="w-48 h-48 object-cover mx-auto rounded-full"
            />
            <p className="mt-2 text-lg">Author: {profile.author}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
