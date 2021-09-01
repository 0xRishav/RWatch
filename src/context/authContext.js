import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../custom-hooks/useLocalStorage";
import axios from "axios";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", false);

  const baseUrl = "https://rwatch-api.herokuapp.com";

  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["x-auth-token"] = accessToken;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      let refreshToken = localStorage.getItem("refreshToken");
      if (
        refreshToken &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        return axios
          .post(`${baseUrl}/generate-access-tokens`, {
            refreshToken: refreshToken,
          })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("accessToken", res.data.accessToken);
              return axios(originalRequest);
            }
          });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (currentUser) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const signUpUser = async (name, email, password) => {
    try {
      const res = await axios.post(`${baseUrl}/user/signup`, {
        name: name,
        email: email,
        password: password,
      });
      console.log("res", res);
      if (res.data.success) {
        setCurrentUser(res.data.data.user);
        localStorage.setItem("accessToken", res.data.data.accessToken);
        return res;
      } else {
        console.log("invalid email or password");
        return res;
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function loginWithCredentials(email, password) {
    try {
      const response = await axios.post(`${baseUrl}/user/signin`, {
        email,
        password,
      });
      console.log("response", response);
      if (response.data.success) {
        console.log(response);
        setCurrentUser(response.data.populatedUser);
        setIsUserLoggedIn(true);
      } else {
        console.log("invalid login request");
      }
      return response;
    } catch (err) {
      console.log(err);
      return console.log(err);
    }
  }
  return (
    <authContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        loginWithCredentials,
        signUpUser,
        currentUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
