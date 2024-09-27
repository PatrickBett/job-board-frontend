import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Protected({ children, setIsLoggedIn }) {
  const [isauthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth();
  }, []);

  //   function to refresh token
  const tokenRefresh = async () => {
    const refreshtoken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = api.post("api/token/refresh/", { refresh: refreshtoken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  //   function if we need to refresh token or if we are good to go
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    // no token available
    if (!token) {
      setIsAuthorized(false);
    } else {
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        await tokenRefresh();
        setIsLoggedIn(false);
      } else {
        setIsAuthorized(true);
        setIsLoggedIn(true);
      }
    }
  };
  if (isauthorized == null) {
    return <div>Loading...</div>;
  }

  return isauthorized ? children : <Navigate to="/login" />;
}

export default Protected;
