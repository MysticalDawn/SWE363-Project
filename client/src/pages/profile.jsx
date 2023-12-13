// Profile.js
import { CustomNav } from "../components/custom_nav.jsx";
import placeHolder from "../img/anonymous-pic.png";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/profile.css";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export const Profile = () => {
  const [cookies, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const logout = () => {
    try {
      setCookies("token", "", { path: "/" });
      window.localStorage.removeItem("userID");
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const initialProfileData = {
    name: "test",
    email: "real@gmail.com",
    phone: "",
    city: "",
    age: 22,
    major: "Computer Science",
    picture: placeHolder,
  };

  const [profileData, setProfileData] = useState(initialProfileData);

  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/GetUserInfo", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setProfileData({
        ...profileData,
        name: response.data.name,
        email: response.data.email,
        major: response.data.major,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access");
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const majorOptions = [
    { label: "Computer Science", value: "Computer Science" },
    { label: "Mathematics", value: "Mathematics" },
    { label: "Physics", value: "Physics" },
    // Add more options as needed
  ];

  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Connect the database here in order to save the user updated information
  };
  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://localhost:3001/upload/upload-picture", formData, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCVUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://localhost:3001/upload/upload-cv", formData, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const pictureInputRef = useRef(null);
  const cvInputRef = useRef(null);

  return (
    <>
      <CustomNav />
      <div className="parent-container">
        <div className="profile-container">
          <div className="profile-left">
            <div className="profile-picture">
              <img src={profileData.picture} alt="Profile" />
            </div>
            <input
              className="load-picture"
              type="file"
              id="load-picture"
              accept="image/*"
              ref={pictureInputRef}
              onChange={handlePictureUpload}
            />
            <input
              type="file"
              id="cv"
              name="cv"
              ref={cvInputRef}
              onChange={handleCVUpload}
              style={{ display: "none" }}
            />

            <div className="button-container">
              <button
                htmlFor="load-picture"
                className="button"
                onClick={() => pictureInputRef.current.click()}
              >
                Change picture
              </button>
              <button
                htmlFor="cv"
                className="button"
                onClick={() => cvInputRef.current.click()}
              >
                Upload CV
              </button>
            </div>
          </div>
          <div className="profile-details">
            <form>
              <label>
                Name:
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                />
              </label>
              <label>
                Email:
                <input
                  type="text"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  placeholder="05********"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  disabled={!isEditing}
                />
              </label>
              <label>
                Major:
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={profileData.major}
                  options={majorOptions}
                  value={majorOptions.find(
                    (option) => option.value === profileData.major
                  )}
                  onChange={(option) =>
                    handleInputChange("major", option.value)
                  }
                  isDisabled={!isEditing}
                />
              </label>
            </form>

            <div className="button-container">
              {isEditing ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
              )}
              <button onClick={logout}>Log Out</button>
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
};
