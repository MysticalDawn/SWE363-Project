import { CustomNav } from "../components/custom_nav.jsx";
import { v4 as uuidv4 } from "uuid";
import "../styles/company_info.css";
import locationLogo from "../img/location.svg";
import anonymousPic from "../img/anonymous-pic.png";
import Rating from "@mui/material/Rating";
import { useCookies } from "react-cookie";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export const CompanyInfo = () => {
  const { company } = useParams();
  const [data, setData] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const getCompanyReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/reviews/data/${company}`
      );
      setReviewsData(response.data);
    } catch (error) {
      console.error("Error fetching company reviews:", error);
    }
  };
  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/GetUserInfo", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setUserData(response.data);
      console.log(userData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access");
      } else {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/jobs/data/${company}`
        );
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    getUserInfo();
    getCompanyReviews();
    console.log(reviewsData);
  }, [company,submissionStatus]);
  const [userData, setUserData] = useState({});
  const [cookies] = useCookies(["token"]);

  const starlabels = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };
  const [starValue, setStarValue] = useState(3);
  const [labelValue, setLabelValue] = useState("OK");
  const [hoverValue, setHoverValue] = useState(-1);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const reviewFormRef = useRef(null);

  const postReview = async (e) => {
    e.preventDefault();
    const reviewID = uuidv4();
    let formData = {};
    console.log(isAnonymous);
    if (isAnonymous) {
      formData = {
        id: reviewID,
        user_mail: userData.email,
        username: "Anonymous",
        user_major: userData.major,
        rating: starValue,
        review_text: reviewText,
        company: company,
      };
    } else {
      formData = {
        id: reviewID,
        user_mail: userData.email,
        username: userData.name,
        user_major: userData.major,
        rating: starValue,
        review_text: reviewText,
        company: company,
      };
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/reviews/post",
        formData
      );
      setReviewText("");
      setSubmissionStatus({
        success: true,
        message: "Review submitted successfully!",
      });
      console.log(starValue,"is astar")
      const JobResponse = await axios.post(
        "http://localhost:3001/jobs/modifyReviews",
        {starRating: starValue,company}
      );
      console.log("Response:", response.data);
      console.log("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const scrollToReviewForm = () => {
    if (reviewFormRef.current) {
      reviewFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const CompanyElement = ({ jobObject }) => {
    return (
      <section className="company-info">
        <header className="title-container">
          <h1 id="company-name">{jobObject.company}</h1>
          <img src={jobObject.companys_logo} alt="logo" width={130} />
        </header>
        <p className="company-description">{jobObject.purpose_statement}</p>
        <span className="company-data">
          <a href={jobObject.location_url} className="train-location">
            <img src={locationLogo} alt="location" width={30} />
            <p>{jobObject.location}</p>
          </a>
          <span style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <Rating
              className="stars"
              value={jobObject.rating_score}
              readOnly
              size="large"
              precision={0.1}
            ></Rating>
            <i style={{ padding: "5px" }}>{jobObject.rating_score}</i>
          </span>
        </span>
      </section>
    );
  };
  const ReviewsElement = (reviewObject) => {
    return (
      <article className="review-container">
        <div className="person-data">
          <img src={anonymousPic} alt="profile-pic" height={43} />
          <p className="user-name">{reviewObject.username}</p>
          <p className="major">({reviewObject.user_major} Student)</p>
        </div>
        <div className="review-text">
          <p>{reviewObject.review_text}</p>
        </div>
        <div className="rating-section">
          <p>Final Rating:</p>
          <Rating
            className="stars"
            value={reviewObject.rating}
            readOnly
            size="medium"
          ></Rating>
          {/* <span className="rating-buttons">
        <button className="like main-button"><img src={likeLogo} alt="like" height={40}/></button>
        <button className="dislike main-button"><img src={dislikeLogo} alt="dislike" height={30} width={30}/></button>
      </span> */}
        </div>
      </article>
    );
  };
  const reviewsSection = (reviewsList) => {
    return (
      <>
        {reviewsList.map((value, index) => (
          <div key={index}>{ReviewsElement(value)}</div>
        ))}
      </>
    );
  };
  return (
    <>
      <CustomNav />
      <div className="main-comp">
        <CompanyElement jobObject={data} />
        <section className="reviews">
          <div className="reviews-header">
            <h2>Reviews </h2>
            <button className="main-button" onClick={scrollToReviewForm}>
              Create a Review!
            </button>
          </div>
          <article className="review-container">
            <div className="person-data">
              <img src={anonymousPic} alt="profile-pic" height={43} />
              <p className="user-name">Anonymous</p>
              <p className="major">(CS Student)</p>
            </div>
            <div className="review-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque commodo ut nisl quis scelerisque. Pellentesque
                vulputate ornare odio, vitae sollicitudin orci tincidunt ut. Ut
                ut placerat ante, et ornare metus. Quisque fringilla mi
                tincidunt, commodo ante vel, elementum lectus. Sed vestibulum
                odio sed convallis dictum. Vivamus rutrum nisl iaculis interdum
                gravida. Quisque vitae risus vestibulum leo dignissim tincidunt
                a vitae arcu. Aenean eget sollicitudin lacus. Nunc nec consequat
                sem. Fusce et tortor nulla. Nunc bibendum id urna id tempus.
                Suspendisse ut semper lacus, at mollis augue. Sed massa arcu,
                lobortis eget ipsum sit amet, aliquet ornare erat. Curabitur
                fringilla in tortor vitae auctor. Vivamus tellus libero,
                porttitor et semper vitae, vulputate eu augue. Aliquam eu magna
                id turpis volutpat aliquet ullamcorper eu turpis. Quisque
                finibus eros a nisl accumsan ullamcorper. Phasellus euismod
                risus vel dictum molestie.
              </p>
            </div>
            <div className="rating-section">
              <p>Final Rating:</p>
              <Rating
                className="stars"
                value={3}
                readOnly
                size="medium"
              ></Rating>
            </div>
          </article>
          {reviewsSection(reviewsData)}
        </section>
        <section className="review-form" ref={reviewFormRef}>
          <form action="" onSubmit={postReview}>
            <textarea
              name="review-text"
              id="review-text"
              cols="30"
              rows="10"
              placeholder="Write a Review"
              minLength={50}
              onChange={(e) => {
                setReviewText(e.target.value);
              }}
              value={reviewText}
            ></textarea>
            <span className="star-container">
              <Rating
                className="active-stars"
                name="simple-controlled"
                size="medium"
                value={starValue}
                onChange={(event, newValue) => {
                  setStarValue(newValue);
                  setLabelValue(starlabels[newValue]);
                }}
                onChangeActive={(event, newHover) => {
                  setHoverValue(newHover);
                }}
              ></Rating>
              <p className="star-label">
                {hoverValue == -1 ? labelValue : starlabels[hoverValue]}
              </p>
            </span>
            <input
              type="checkbox"
              name="anonymousC"
              id="anonymousC"
              style={{ marginLeft: "5px" }}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <label
              htmlFor="anonymousC"
              style={{ fontSize: "large", marginLeft: "5px" }}
            >
              Post Review anonymously
            </label>
            <input
              type="submit"
              className="main-button"
              style={{ display: "block", marginTop: "10px" }}
            />
            {submissionStatus && submissionStatus.success && (
              <p style={{ color: "green" ,marginTop:"10px",fontSize:"larger"}}>{submissionStatus.message}</p>
            )}
          </form>
        </section>
      </div>
    </>
  );
};
