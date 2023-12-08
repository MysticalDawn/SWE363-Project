import { CustomNav } from "../components/custom_nav.jsx";
import "../styles/catalog.css";
import aramco from "../img/aramco-logo.png";
import Rating from "@mui/material/Rating";
import locationLogo from "../img/location.svg";
import sortByLogo from "../img/sortby.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export const Catalog = () => {
  const [data, setData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  // const [uniqueMajors, setUniqueMajors] = useState([]);
  useEffect(() => {
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
  console.log(uniqueMajors);
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
        <Link to={`/company/${jobObject.company}`} style={{textDecoration:"none"}}>
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
          <p style={{color:"white"}}>3500 SAR Avg</p>
          <button type="submit" className="apply" onClick={(e) => e.stopPropagation()}>
            Apply
          </button>
        </section>
        </Link>
      </article>
    );
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
    console.log(selectedMajor);
    if (selectedMajor == "default") {
      setVisibleData(data);
    } else {
      setVisibleData(
        data.filter((value) => value.majors.includes(selectedMajor))
      );
    }
  };
  console.log(visibleData.length==0)
  return (
    <>
      <CustomNav />
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
          <hr />
          <i className="major-section">
            Duration:
            <br />
            <input type="checkbox" name="summer" id="summer" />
            <label htmlFor="summber"> Summer Training</label>
            <br />
            <input type="checkbox" name="summer" id="summer" />
            <label htmlFor="summber"> COOP</label>
            <br />
            <input type="checkbox" name="summer" id="summer" />
            <label htmlFor="summber"> Internship</label>
          </i>
          <hr />

          <i className="sortby">
            <i className="sort_label">
              <img src={sortByLogo} alt="sortby" width={25} />
              <p>Sort By:</p>
            </i>
            <input type="radio" id="recent" name="sortby" value="recent" />{" "}
            <label htmlFor="recent">Most Recent</label>
            <br />
            <input type="radio" id="rating" name="sortby" value="raing" />{" "}
            <label htmlFor="rating">Highest Rating</label>
            <br />{" "}
            <input
              type="radio"
              id="popular"
              name="sortby"
              value="popular"
            />{" "}
            <label htmlFor="popular">Most Popular</label>
          </i>
          <hr />
          <i className="location-filter">
            <i className="sort_label">
              <img src={locationLogo} alt="logos" width={20} />
              <p>Train Location:</p>
            </i>
            <select name="location" id="location" defaultValue={"default"}>
              <option value="default">All Locations</option>
              <option value="Dhahran">Dhahran</option>
              <option value="Riyadh">Riyadh</option>
              <option value="Jeddah">Jeddah</option>
              <option value="Neom">Neom</option>
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
          {visibleData.length==0?<section id="empty-grid">
            <p>Nothing here yet...</p>
          </section>:<section id="jobs-grid">
            {jobCards(visibleData)}
          </section>}
          
        </section>
      </main>
    </>
  );
};
