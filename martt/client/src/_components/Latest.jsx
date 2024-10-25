/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "../_styles/latest.scss";
import { CiDesktop, CiMobile1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { productApi } from "../_constants/api-urls";

const Latest = ({ productLength }) => {
  const navigate = useNavigate();
  const [menuOpt, setOpt] = useState(false);
  const [data, setData] = useState([]);

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };
  const requestApi = async () => {
    try {
      const res = await axios.get(`${productApi}/all`);
      const shuffledProducts = shuffleArray(
        res.data.foundProducts.splice(0, productLength)
      );
      setData(shuffledProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    requestApi();
  }, [productLength]);

  return (
    <div className="arrivals-container flex col">
      <div className="toggler flex">
        <div
          className="toggle flex"
          style={{
            background: `${menuOpt ? "#eee" : ""}`,
          }}
          onClick={() => setOpt(true)}
        >
          <CiDesktop />
        </div>
        <div
          className="toggle flex"
          style={{
            background: `${!menuOpt ? "#eee" : ""}`,
          }}
          onClick={() => setOpt(false)}
        >
          <CiMobile1 />
        </div>
        <button className="btn-explore flex">EXPLORE</button>
      </div>
      <div className="wrapper flex">
        {data?.map((item, index) => {
          return (
            <div
              className={menuOpt ? "desktop flex" : "mobile flex"}
              key={index}
            >
              <img
                src={item?.image[0]}
                alt=""
                onClick={() => navigate(`/product/${item?._id}`)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Latest;
