import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { useState, useEffect } from "react";

export const Protect = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh");
    try {
      const res = await api.post("/login/refresh", { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem("access", res.data.access);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (err) {
      console.log(err);
      setIsAuthorized(false);
    }
  };
  const auth = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    const decoded = jwtDecode(token);
    const tokenexpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenexpiration < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  };
  if (isAuthorized === null) {
    return <div>...Loading</div>;
  }
  return isAuthorized ? children : <Navigate to="/login" />;
};
