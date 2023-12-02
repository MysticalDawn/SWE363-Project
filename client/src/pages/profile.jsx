// Profile.js
import { CustomNav } from "../components/custom_nav.jsx";
import placeHolder from "../img/anonymous-pic.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/profile.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Profile = () => {
  // after we create the database for users, each field will must be initialized accordingly
  const [_, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const logout = () => {
    try {
      setCookies("token", "", "");
      window.localStorage.removeItem("userID");
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const initialProfileData = {
    name: "Omar",
    email: "real@gmail.com",
    phone: "000000",
    city: "Dammam",
    age: 22,
    picture: placeHolder,
  };
  // state for editing the data (initial model and could be improved later)
  const [profileData, setProfileData] = useState(initialProfileData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // we need to connect the database here in order to save the user updated information
  };

  return (
    <>
      <CustomNav />
      <div className="profile-container">
        <div className="profile-picture">
          <img src={profileData.picture} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>{profileData.name}</h2>
          <p>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={profileData.email}
                //event immeter
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            ) : (
              profileData.email
            )}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={profileData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            ) : (
              profileData.phone
            )}
          </p>
          <p>
            <strong>City:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={profileData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
              />
            ) : (
              profileData.city
            )}
          </p>
          <p>
            <strong>Age:</strong>{" "}
            {isEditing ? (
              <input
                type="number"
                value={profileData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
            ) : (
              profileData.age
            )}
          </p>
          {isEditing ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
          <input
            className="load-picture"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProfileData({
                    ...profileData,
                    picture: reader.result,
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          <Link to="/login">
            <button onClick={logout}>Log Out</button>
          </Link>
        </div>
      </div>{" "}
      //the link above should include the log out functionality.
    </>
  );
};
