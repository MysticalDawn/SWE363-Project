import { CustomNav } from "../components/custom_nav.jsx";
import aramco from "../img/aramco-logo.png";
import "../styles/company_info.css";
import locationLogo from "../img/location.svg";
import anonymousPic from "../img/anonymous-pic.png";
import Rating from "@mui/material/Rating";
import { useState,useRef,useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
export const CompanyInfo = () => {
  const { company } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/jobs/data/${company}`);
        setData(response.data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [company]);

  const starlabels = {
    1: "Useless",
    2: "Poor",
    3: "Ok",
    4: "Good",
    5: "Excellent",
  };
  let review1 = {
    review_id: 12345,
    reviewer: "Ahmad ali",
    company: "Aramco",
    rating: 4,
    is_user_hidden: true,
    review_text:
      "Sed vitae consequat dui. Proin eu quam nibh. Nulla at leo tincidunt, tempus dolor sed, luctus nisi. Mauris auctor ipsum orci, et ornare ligula eleifend sit amet. Fusce hendrerit eleifend lectus, eget euismod magna mollis nec. Morbi consequat libero ut nulla convallis condimentum. Donec quis arcu metus. Phasellus at placerat neque, ac aliquam turpis. Sed dignissim leo at turpis pretium imperdiet. Phasellus et rhoncus orci.",
  };
  let job1 = {
    company: "Aramco",
    summary: `We are one of the world's largest integrated energy and chemicals
    companies, creating value across the hydrocarbon chain, and delivering
    societal and economic benefits to people and communities around the
    globe who rely on the vital energy we supply. We are committed to
    playing a leading role in the energy transition. We have a
    responsibility to help the world achieve a net-zero economy, and our
    people are working hard to help solve the world's sustainability
    challenges. For our customers, we are a supplier of choice. For our
    shareholders, we provide long-term value creation. For communities
    around the world, our ambition is to provide reliable, affordable, and
    more sustainable energy.`,
    location_name: "Dhahran",
    location_url: "https://www.google.com/maps",
    rating: 4,
  };
  const [starValue, setStarValue] = useState(3);
  const [labelValue, setLabelValue] = useState("OK");
  const [hoverValue, setHoverValue] = useState(-1);

  const reviewFormRef = useRef(null);

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
          <span style={{display:"flex",gap:"5px",alignItems:"center"}}>
            <Rating
              className="stars"
              value={jobObject.rating_score}
              readOnly
              size="large"
              precision={0.1}
            ></Rating>
            <i style={{padding:"5px"}}>{jobObject.rating_score}</i>
          </span>
        </span>
      </section>
    );
  };
  const ReviewsElement = ({ reviewObject }) => {
    return (
      <article className="review-container">
        <div className="person-data">
          <img src={anonymousPic} alt="profile-pic" height={43} />
          <p className="user-name">
            {reviewObject.is_user_hidden ? "Anonymous" : reviewObject.reviewer}
          </p>
          <p className="major">(CS Student)</p>
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
  return (
    <>
      <CustomNav />
      <div className="main-comp">
        <CompanyElement jobObject={data} />
        <section className="reviews">
          <div className="reviews-header">
            <h2>Reviews </h2>
            <button className="main-button" onClick={scrollToReviewForm}>Create a Review!</button>
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
              {/* <span className="rating-buttons">
                <button className="like main-button"><img src={likeLogo} alt="like" height={40}/></button>
                <button className="dislike main-button"><img src={dislikeLogo} alt="dislike" height={30} width={30}/></button>
              </span> */}
            </div>
          </article>
          <ReviewsElement reviewObject={review1} />
        </section>
        <section className="review-form" ref={reviewFormRef}>
          <form action="">
            <textarea
              name="review-text"
              id="review-text"
              cols="30"
              rows="10"
              placeholder="Write a Review"
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
                  console.log(labelValue);
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
              type="submit"
              className="main-button"
              style={{ display: "block", marginTop: "10px" }}
            />
          </form>
        </section>
      </div>
    </>
  );
};
