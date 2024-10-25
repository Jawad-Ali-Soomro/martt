/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { userApi } from "../_constants/api-urls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../_styles/profile.scss";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const token = window.localStorage.getItem("_martt_auth");
  const navigate = useNavigate();

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

  return <div className="main-profile flex"></div>;
};

export default Profile;
