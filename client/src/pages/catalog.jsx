import { CustomNav } from "../components/custom_nav.jsx";
import "../styles/catalog.css";
export const Catalog = () => {
  return (
    <>
      <CustomNav />
      <h1 id="title">Catalog:</h1>
      <main id="catalog-body">
        <aside id="filter">
          <i className="major-section">
            Major: <br />
            <select name="major" id="major">
              <option value="" disabled selected>
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
              <h1 className="company-name">Company</h1>
              <h2 className="targetted-majors">major1, major2, major3</h2>
              <h3 className="training-location">Jeddah</h3>
              <p className="job-details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                accumsan augue ullamcorper, commodo orci eu, ullamcorper nulla.
                Cras id aliquet felis.
              </p>
              <section>
                <i className="users-rating">5/5</i>
                <button type="submit" className="apply">Apply</button>
              </section>
            </article>
            <article className="job-card">
              <h1 className="company-name">Company</h1>
              <h2 className="targetted-majors">major1, major2, major3</h2>
              <h3 className="training-location">Jeddah</h3>
              <p className="job-details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                accumsan augue ullamcorper, commodo orci eu, ullamcorper nulla.
                Cras id aliquet felis.
              </p>
              <section>
                <i className="users-rating">5/5</i>
                <button type="submit" className="apply">Apply</button>
              </section>
            </article>
            <article className="job-card">
              <h1 className="company-name">Company</h1>
              <h2 className="targetted-majors">major1, major2, major3</h2>
              <h3 className="training-location">Jeddah</h3>
              <p className="job-details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                accumsan augue ullamcorper, commodo orci eu, ullamcorper nulla.
                Cras id aliquet felis.
              </p>
              <section>
                <i className="users-rating">5/5</i>
                <button type="submit" className="apply">Apply</button>
              </section>
            </article>
            <article className="job-card">
              <h1 className="company-name">Company</h1>
              <h2 className="targetted-majors">major1, major2, major3</h2>
              <h3 className="training-location">Jeddah</h3>
              <p className="job-details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                accumsan augue ullamcorper, commodo orci eu, ullamcorper nulla.
                Cras id aliquet felis.
              </p>
              <section>
                <i className="users-rating">5/5</i>
                <button type="submit" className="apply">Apply</button>
              </section>
            </article>
          </section>
        </section>
      </main>
    </>
  );
};
