/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import "../_styles/not-found.scss";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found flex col">
      <h2>page not found</h2>
      <p>we're sorry the page you're looking for couldn't be found</p>
      <div className="btn-back flex" onClick={() => navigate("/")}>
        HOMEpagE
      </div>
    </div>
  );
};

export default NotFound;
