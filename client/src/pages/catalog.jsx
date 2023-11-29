import { CustomNav } from "../components/custom_nav.jsx";
import "../styles/catalog.css";
import aramco from "../img/aramco-logo.png";
import Rating from "@mui/material/Rating";
import locationLogo from "../img/location.svg";
import sortByLogo from "../img/sortby.svg";
import { Link } from "react-router-dom";
export const Catalog = () => {
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
    targetMajors: majors,
  };
  function cardElement(jobObject) {
    return (
      <article className="job-card">
        <section className="card-body">
          <img src={aramco} alt="logo" width={40} />
          <Link to="/company">
            <h1 className="company-name">{jobObject.company}</h1>
          </Link>
          <p className="rating">
            <Rating
              className="stars"
              value={jobObject.rating_score}
              readOnly
            ></Rating>
            <i className="rating-count">({jobObject.rating_count} users)</i>
          </p>
          <div className="train-location">
            <img src={locationLogo} alt="location" width={20} />
            <h2>{jobObject.compLocation}</h2>
          </div>
          {majorsElement(jobObject.targetMajors)}
        </section>
        <section className="outer-card">
          <button type="submit" className="apply">
            Apply
          </button>
        </section>
      </article>
    );
  }
  return (
    <>
      <CustomNav />
      <h1 id="title">Catalog:</h1>
      <main id="catalog-body">
        <aside id="filter">
          <h2>Filters:</h2>
          <i className="major-section">
            Major: <br />
            <select name="major" id="major" defaultValue={"default"}>
              <option value="default">All Majors</option>
              <option value="CS">CS</option>
              <option value="SWE">SWE</option>
              <option value="EE">EE</option>
              <option value="COE">COE</option>
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
              <img src={locationLogo} alt="logo" width={20} />
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
            <input type="text" name="search" id="search" placeholder="Search for Companies..."/>
          </p>
          <section id="jobs-grid">
            <article className="job-card">
              <section className="card-body">
                <img src={aramco} alt="logo" width={40} />
                <h1 className="company-name">Aramco</h1>
                <p className="rating">
                  <Rating className="stars" value={4} readOnly></Rating>
                  <i className="rating-count">(318 users)</i>
                </p>
                <div className="train-location">
                  <img src={locationLogo} alt="location" width={20} />
                  <h2>Dhahran</h2>
                </div>
                {majorsElement(majors)}
              </section>
              <section className="outer-card">
                <button type="submit" className="apply">
                  Apply
                </button>
              </section>
            </article>
            {cardElement(aramcoJob)}
            {cardElement(aramcoJob)}
            {cardElement(aramcoJob)}
            {cardElement(aramcoJob)}
          </section>
        </section>
      </main>
    </>
  );
};
