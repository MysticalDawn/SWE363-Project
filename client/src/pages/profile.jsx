import "../styles/signup.css";
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
  const validatePhone = (phone) => {
    const phoneRegex = /^05\d{8}$/;
    return phoneRegex.test(phone);
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
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

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
        phone: response.data.phone,
        city: response.data.city,
        cv: response.data.cv,
        picture: response.data.profile_pic
          ? response.data.profile_pic
          : placeHolder,
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
  const handleInputChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value,
    });
  };

  const handleSave = async () => {
    if (profileData.phone.length != 0) {
      if (!validatePhone(profileData.phone)) {
        setErrorMessage(
          "Phone number must start with '05' and be exactly 10 digits long."
        );
        return;
      }
    }
    setErrorMessage("");
    setIsEditing(false);
    try {
      const response = await axios.post(
        "http://localhost:3001/update",
        profileData,
        { headers: { Authorization: `Bearer ${cookies.token}` } }
      );

      console.log(response.data.message);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const updateProfilePic = (newPicPath) => {
    setTimeout(() => {
      setProfileData({
        ...profileData,
        picture: newPicPath,
      });
    });
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
          updateProfilePic(response.data.filePath);
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
          //console.log(response);
          setProfileData({
            ...profileData,
            cv: response.data.filePath,
          });
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
              style={{ display: "none" }}
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

              {profileData.cv == null ? (
                <button
                  htmlFor="cv"
                  className="button"
                  onClick={() => cvInputRef.current.click()}
                >
                  Upload CV
                </button>
              ) : (
                <button
                  htmlFor="cv"
                  className="button"
                  onClick={() => cvInputRef.current.click()}
                >
                  Change uploaded CV
                </button>
              )}
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
                <input type="text" value={profileData.email} disabled={true} />
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
              <select
                className="email-input major-input"
                id="major_choice"
                value={profileData.major}
                onChange={(e) => handleInputChange("major", e.target.value)}
                disabled={!isEditing}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Computer Engineering">
                  Computer Engineering
                </option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
              </select>
            </form>

            <div className="button-container">
              {isEditing ? (
                <button onClick={handleSave}>Save</button>
              ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
              )}
              <button onClick={logout}>Log Out</button>
            </div>
            {errorMessage && (
              <div style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </div>
            )}
          </div>
        </div>{" "}
      </div>
    </>
  );
};
