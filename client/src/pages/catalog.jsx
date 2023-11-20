import { CustomNav } from "../components/custom_nav.jsx";
import "../styles/catalog.css";
import aramco from "../img/aramco-logo.png";
import Rating from '@mui/material/Rating';
import locationLogo from "../img/location.svg";
export const Catalog = () => {
  let majors =["CS","SWE","COE","EE"];
  function majorsElement(majorsList){
    let elementsList = majorsList.map(major=><i className={"major "+major} key={major}>
      {major}
    </i>)
    return <div className="targetted-majors">
      {elementsList}
    </div>
  }
  return (
    <>
      <CustomNav />
      <h1 id="title">Catalog:</h1>
      <main id="catalog-body">
        <aside id="filter">
          <i className="major-section">
            Major: <br />
            <select name="major" id="major" defaultValue={"default"}>
              <option value="default" disabled>
                Select your option
              </option>
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
          <i className=""></i>
        </aside>
        <section id="jobs-body">
          <p id="search-bar">
            <label htmlFor="seach">Search: </label>
            <input type="text" name="search" id="search" />
          </p>
          <section id="jobs-grid">
            <article className="job-card">
              <section className="card-body">
                <img src={aramco} alt="logo" width={40}/>
                <h1 className="company-name">Aramco</h1>
                <p className="rating">
                  <Rating className="stars" value={4} readOnly></Rating>
                  <i className="rating-count">(318 users)</i>
                </p>
                <div className="train-location">
                  <img src={locationLogo} alt="location" width={20}/>
                  <h2>Dhahran</h2>
                </div>
                {majorsElement(majors)}
              </section>
              <section className="outer-card">
                
                <button type="submit" className="apply">Apply</button>
              </section>
            </article>
          </section>
        </section>
      </main>
    </>
  );
};
