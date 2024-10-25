import {
  BsFacebook,
  BsInstagram,
  BsSend,
  BsTwitterX,
  BsWhatsapp,
} from "react-icons/bs";
import Latest from "../_components/Latest";
import "../_styles/home.scss";

const Welcome = () => {
  return (
    <div className="flex home-container col">
      <div className="hero-sect flex col">
        <h1>martt.</h1>
        <div className="bottom flex">
          <p>sense of manners, style & a good presence.</p>
          <p>simple and elegent design you must love it</p>
          <p>discover the world where each product is masterpice.</p>
        </div>
      </div>
      <Latest productLength={12} />
      <div className="newsletter flex col">
        <h3>Join OUr Newsletter</h3>
        <div className="input-box flex">
          <input type="text" placeholder="Email Address" />
          <div className="icon flex">
            <BsSend />
          </div>
        </div>
        <div className="social-icons flex">
          <a href="/" className="icon flex">
            <BsFacebook />
          </a>
          <a href="/" className="icon flex">
            <BsInstagram />
          </a>
          <a href="/" className="icon flex">
            <BsWhatsapp />
          </a>
          <a href="/" className="icon flex">
            <BsTwitterX />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
