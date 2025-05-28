import "./homepage.css";

import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>LAMA AI</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A blanditiis
          earum enim est, ullam, dolorem fuga tempora quia, distinctio
          perspiciatis dignissimos odit laboriosam sint officia! Amet at esse
          neque odit!
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
