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
      <h1>Welcome To</h1>
      <h2>MARTT.</h2>
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
