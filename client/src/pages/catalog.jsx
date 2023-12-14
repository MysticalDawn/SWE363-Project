import { CustomNav } from "../components/custom_nav.jsx";
import "../styles/catalog.css";
import aramco from "../img/aramco-logo.png";
import Rating from "@mui/material/Rating";
import locationLogo from "../img/location.svg";
import sortByLogo from "../img/sortby.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
export const Catalog = () => {
  const [userInfo, setUserInfo] = useState({});
  const [cookies] = useCookies(["token"]);
  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:3001/GetUserInfo", {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      setUserInfo(response.data);
      console.log(userInfo);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access");
      } else {
        console.error(error);
      }
    }
  };
  const [data, setData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  let tempVisibleData = [];
  // const [uniqueMajors, setUniqueMajors] = useState([]);
  useEffect(() => {
    getUserInfo();
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/jobs/data");
        setData(response.data);
        setVisibleData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const allMajors = data.reduce((acc, job) => {
    return acc.concat(job.majors || []); // Ensure job.majors exists and handle any potential undefined values
  }, []);
  // Convert to a set to remove duplicates and then back to an array
  let uniqueMajors = Array.from(new Set(allMajors));
  const allLocations = data.reduce((acc, job) => {
    return acc.concat(job.location || []); // Ensure job.majors exists and handle any potential undefined values
  }, []);
  // Convert to a set to remove duplicates and then back to an array
  let uniqueLocations = Array.from(new Set(allLocations));
  let majors = ["CS", "SWE", "COE", "EE"];
  function majorsElement(majorsList) {
    let elementsList = majorsList.map((major) => (
      <i className={"major " + major} key={major}>
        {major}
      </i>
    ));
    return <div className="targetted-majors">{elementsList}</div>;
  }
  let aramcoJob = {
    company: "Aramco",
    rating_score: 4.5,
    rating_count: 319,
    compLocation: "Dhahran",
    majors: majors,
  };
  function cardElement(jobObject) {
    return (
      <article className="job-card">
        <Link
          to={`/company/${jobObject.company}`}
          style={{ textDecoration: "none" }}
        >
          <section className="card-body">
            <img src={jobObject.companys_logo} alt="cLogo" width={40} />

            <h1 className="company-name">{jobObject.company}</h1>
            <p className="rating">
              <Rating
                className="stars"
                value={parseFloat(jobObject.rating_score)}
                readOnly
                precision={0.1}
              ></Rating>
              <i className="rating-count">({jobObject.rating_count} users)</i>
            </p>
            <div className="train-location">
              <img src={locationLogo} alt="location" width={20} />
              <h2>{jobObject.location}</h2>
            </div>
            {majorsElement(jobObject.majors)}
          </section>
          <section className="outer-card" onClick={(e) => e.stopPropagation()}>
            <p style={{ color: "white" }}>{jobObject.salary} SAR Avg</p>
            <button
              type="submit"
              className="apply"
              onClick={(e) => e.stopPropagation()}
            >
              Apply
            </button>
          </section>
        </Link>
      </article>
    );
  }
  function sortByPopularity() {
    const sortedData = [...visibleData].sort(
      (a, b) => b.rating_count - a.rating_count
    );
    setVisibleData(sortedData);
  }
  function sortByRating() {
    const sortedData = [...visibleData].sort(
      (a, b) => b.rating_score - a.rating_score
    );
    setVisibleData(sortedData);
  }
  function sortByRecent() {
    const sortedData = data;
    setVisibleData(sortedData);
  }
  const jobCards = (Jobsdata) => {
    return (
      <>
        {Jobsdata.map((value, index) => (
          <div key={index}>{cardElement(value)}</div>
        ))}
      </>
    );
  };
  const filterMajor = (selectedMajor) => {
    if (selectedMajor == "default") {
      setVisibleData(data);
    } else {
      setVisibleData(
        data.filter((value) => value.majors.includes(selectedMajor))
      );
    }
  };
  const filterLocation = (selectedLocation) => {
    if (selectedLocation == "default") {
      setVisibleData(data);
    } else {
      setVisibleData(
        data.filter((value) => value.location.includes(selectedLocation))
      );
    }
  };
  return (
    <>
      <CustomNav />
      <div className="catalog-separator"></div>
      <h1 id="title">Catalog:</h1>
      <main id="catalog-body">
        <aside id="filter">
          <h2>Filters:</h2>
          <i className="major-section">
            Major: <br />
            <select
              name="major"
              id="major"
              defaultValue={"default"}
              onChange={(e) => filterMajor(e.target.value)}
            >
              <option value="default">All Majors</option>
              {uniqueMajors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </i>
          <div id="small-separator"></div>
          <i className="sortby">
            <i className="sort_label">
              <img src={sortByLogo} alt="sortby" width={25} />
              <p>Sort By:</p>
            </i>
            <input
              type="radio"
              id="recent"
              name="sortby"
              value="recent"
              onClick={sortByRecent}
            />{" "}
            <label htmlFor="recent">Most Recent</label>
            <br />
            <input
              type="radio"
              id="rating"
              name="sortby"
              value="raing"
              onClick={sortByRating}
            />{" "}
            <label htmlFor="rating">Highest Rating</label>
            <br />{" "}
            <input
              type="radio"
              id="popular"
              name="sortby"
              value="popular"
              onClick={sortByPopularity}
            />{" "}
            <label htmlFor="popular">Most Popular</label>
          </i>
          <div id="small-separator2"></div>
          <i className="location-filter">
            <i className="sort_label">
              <img src={locationLogo} alt="logos" width={20} />
              <p>Train Location:</p>
            </i>
            <select
              name="location"
              id="location"
              defaultValue={"default"}
              onChange={(e) => filterLocation(e.target.value)}
            >
              <option value="default">All Locations</option>
              {uniqueLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </i>
        </aside>
        <section id="jobs-body">
          <p id="search-bar">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for Companies..."
            />
          </p>
          {visibleData.length == 0 ? (
            <section id="empty-grid">
              <p>Nothing here yet...</p>
            </section>
          ) : (
            <section id="jobs-grid">{jobCards(visibleData)}</section>
          )}
        </section>
      </main>
    </>
  );
};
