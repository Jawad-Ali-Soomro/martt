/* eslint-disable react/jsx-no-comment-textnodes */
import { useEffect, useState } from "react";
import "../_styles/header.scss";
import { BiHeart, BiShoppingBag, BiUser } from "react-icons/bi";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userApi } from "../_constants/api-urls";

const Header = () => {
  const token = window.localStorage.getItem("_martt_auth");
  const navigate = useNavigate();
  const [showProfileOptions, setProfileOptions] = useState(false);
  const [showLogin, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const getProfile = async () => {
    try {
      const res = await axios.get(`${userApi}/profile/${token}`);

      if (res.status === 200) {
        setUserInfo(res.data.user);
      } else {
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUserInfo(null);
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);
  const [activeTab, setTab] = useState("men");
  const tab = window.location.pathname;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="header-container flex ">
      <div className="logo flex" onClick={() => navigate("/")}>
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="navs flex">
        <div className="icons flex">
          <div className="icon flex">
            <BiHeart />
          </div>
          <div className="icon flex">
            <BiShoppingBag />
          </div>
          <div
            className="icon flex"
            onClick={() => setProfileOptions(!showProfileOptions)}
          >
            <BiUser />
            {showProfileOptions && (
              <div
                className="user-options flex col"
                onClick={(e) => e.stopPropagation()}
              >
                <li
                  onClick={() =>
                    token ? navigate("/profile") : setLogin(true)
                  }
                  className={tab === "/profile" ? "new" : ""}
                  data-content="on it"
                >
                  {userInfo?.first_name
                    ? "Hi, " + userInfo?.first_name
                    : "Profile"}
                </li>
                <li
                  data-content="NEW"
                  className={
                    userInfo?.notifications?.inApp === true ? "new" : ""
                  }
                >
                  Notifications
                </li>
                <li>Payments</li>
                <li>Orders</li>
                {!token ? (
                  <li
                    onClick={() => {
                      setLogin(true);
                      setProfileOptions(false);
                    }}
                    style={{ background: "#333", color: "white" }}
                  >
                    Login
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      window.localStorage.clear();
                      window.location.reload();
                    }}
                    style={{ background: "#333", color: "white" }}
                  >
                    Logout
                  </li>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className="menu-bars flex col"
          onClick={() => setShowMenu(!showMenu)}
        >
          <div
            className="bar"
            style={{
              transform: showMenu ? "rotate(45deg)" : "rotate(0deg)",
              position: `${showMenu ? "absolute" : ""}`,
            }}
          ></div>

          <div
            className="bar"
            style={{
              transform: showMenu ? "rotate(-45deg)" : "rotate(0deg)",
              position: `${showMenu ? "absolute" : ""}`,
            }}
          ></div>
        </div>
      </div>
      {showLogin && (
        <Login onClose={() => setLogin(false) + setProfileOptions(false)} />
      )}

      <div
        className="menu flex col"
        style={{
          maxHeight: `${showMenu ? "80vh" : "0"}`,
          border: `${showMenu ? "1px solid" : "0"}`,
        }}
      >
        <div className="top-menu flex">
          <ul>
            <li
              style={{
                color: `${activeTab === "men" ? "black" : "rgba(0,0,0,.5)"}`,
              }}
              onClick={() => setTab("men")}
            >
              MEN
            </li>
            <li
              style={{
                color: `${activeTab === "women" ? "black" : "rgba(0,0,0,.5)"}`,
              }}
              onClick={() => setTab("women")}
            >
              women
            </li>
            <li
              style={{
                color: `${activeTab === "kids" ? "black" : "rgba(0,0,0,.5)"}`,
              }}
              onClick={() => setTab("kids")}
            >
              kids
            </li>
          </ul>
        </div>
        <div
          className="categories main flex col"
          style={{
            left: `${activeTab === "men" ? "10px" : "-400px"}`,
          }}
        >
          <ul>
            <p style={{ cursor: "pointer" }}>/// new men arrivals</p>
            <p style={{ cursor: "pointer" }} onClick={() => alert("hello")}>
              halloween
            </p>
            <p style={{ cursor: "pointer" }}>coats</p>
            <p style={{ cursor: "pointer" }}> blazzers // westcoats</p>
            <p style={{ cursor: "pointer" }}>dresses</p>
            <p style={{ cursor: "pointer" }}>t-shirts</p>
            <p style={{ cursor: "pointer" }}>shoes</p>
            <p style={{ cursor: "pointer" }}>trousers</p>
            <p style={{ cursor: "pointer" }}>jackets</p>
          </ul>
          <div className="btns flex">
            <button>special editions</button>
            <button>offers</button>
          </div>
        </div>

        <div
          className="categories main flex col"
          style={{
            left: `${activeTab === "women" ? "10px" : "-400px"}`,
          }}
        >
          <ul>
            <li>/// new women arrivals</li>
            <li>hairpins</li>
            <li>knitwear</li>
            <li>sweetshirts // joggers</li>
            <li>jewelleries</li>
            <li>innerwears </li>
            <li>shoes</li>
            <li>makeup // kits</li>
            <li>basics</li>
            <li>jackets</li>
          </ul>
          <div className="btns flex">
            <button>special editions</button>
            <button>50% off on kits</button>
            <button>30% off</button>
          </div>
        </div>

        <div
          className="categories main flex col"
          style={{
            left: `${activeTab === "kids" ? "10px" : "-400px"}`,
          }}
        >
          <ul>
            <li>/// new kids arrivals</li>
            <li>girls</li>
            <li>boys</li>
            <li>10yrs // 15yrs</li>
            <li>new born</li>
            <li>bags</li>
            <li>baby</li>
          </ul>
          <div className="btns flex">
            <button>special editions</button>
            <button>50% off on kits</button>
            <button>30% off</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
