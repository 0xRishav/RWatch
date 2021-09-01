import { createContext, useEffect, useReducer, useState } from "react";
import useLocalStorage from "../custom-hooks/useLocalStorage";
import axios from "axios";

export const UserContext = createContext();
const baseUrl = "https://rwatch-api.herokuapp.com";

export const UserContextProvider = ({ children }) => {
  const initialState = {
    currentUser: {},
  };

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
    const jsonUser = localStorage.getItem("user");

    if (jsonUser) {
      const parsedUser = JSON.parse(jsonUser);
      dispatch({ type: "SET_USER", payload: parsedUser });
    }
  }, []);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const userReducer = (state, { payload, type }) => {
    switch (type) {
      case "SET_USER":
        return { ...state, user: payload.user };
    }
  };

  const signUpUser = async (name, email, password) => {
    try {
      const res = await axios.post(`${baseUrl}/user/signup`, {
        name: name,
        email: email,
        password: password,
      });
      console.log("res", res);
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        localStorage.setItem("accessToken", res.data.data.accessToken);
        setIsUserLoggedIn(true);
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
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("accessToken", response.data.data.accessToken);
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
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        loginWithCredentials,
        signUpUser,
        ...state,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
