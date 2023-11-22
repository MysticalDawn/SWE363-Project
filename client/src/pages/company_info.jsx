import { CustomNav } from "../components/custom_nav.jsx";
import aramco from "../img/aramco-logo.png";
import "../styles/company_info.css";
import locationLogo from "../img/location.svg";
import anonymousPic from "../img/anonymous-pic.png";
import likeLogo from "../img/like-icon.svg";
import dislikeLogo from "../img/dislike-icon.svg";
import Rating from "@mui/material/Rating";

export const CompanyInfo = () => {
  return (
    <>
      <CustomNav />
      <div className="main-container">
        <section className="company-info">
          <header className="title-container">
            <h1 id="company-name">Aramco</h1>
            <img src={aramco} alt="logo" width={130} />
          </header>
          <p className="company-description">
            We are one of the world's largest integrated energy and chemicals
            companies, creating value across the hydrocarbon chain, and
            delivering societal and economic benefits to people and communities
            around the globe who rely on the vital energy we supply. We are
            committed to playing a leading role in the energy transition. We
            have a responsibility to help the world achieve a net-zero economy,
            and our people are working hard to help solve the world's
            sustainability challenges. For our customers, we are a supplier of
            choice. For our shareholders, we provide long-term value creation.
            For communities around the world, our ambition is to provide
            reliable, affordable, and more sustainable energy.
          </p>
          <span className="company-data">
            <a href="https://www.google.com/maps" className="train-location">
              <img src={locationLogo} alt="location" width={30} />
              <p>Dhahran</p>
            </a>
            <Rating className="stars" value={4} readOnly size="large"></Rating>
          </span>
        </section>
        <section className="reviews">
          <div className="reviews-header">
            <h2>Reviews: </h2>
            <button className="main-button">Create a Review!</button>
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
        </section>
      </div>
    </>
  );
};
