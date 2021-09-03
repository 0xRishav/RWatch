import { createContext, useEffect, useReducer, useState } from "react";
import useLocalStorage from "../custom-hooks/useLocalStorage";
import axios from "axios";

export const UserContext = createContext();
const baseUrl = "https://rwatch-api.herokuapp.com";

export const UserContextProvider = ({ children }) => {
  const initialState = {
    currentUser: {},
    accessToken: false,
    isUserLoading: false,
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
    dispatch({ type: "TOGGLE_LOADING" });
    const jsonUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    console.log("GET ACC", accessToken, jsonUser);

    if (jsonUser && accessToken) {
      const parsedUser = JSON.parse(jsonUser);
      dispatch({ type: "SET_USER", payload: { ...parsedUser } });
      dispatch({ type: "SET_ACCESS_TOKEN", payload: accessToken });
    }
    dispatch({ type: "TOGGLE_LOADING" });
  }, []);

  const likeVideo = async (videoId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const response = await axios.post(`${baseUrl}/likes/add/${videoId}`);
      if (response.status === 200) {
        console.log("LIKE_VIDEO_RES", response.data.data);
        dispatch({ type: "SET_USER", payload: { ...response.data.data } });
        dispatch({ type: "TOGGLE_LOADING" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };
  const resetHistory = async () => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const response = await axios.post(`${baseUrl}/history/reset`);
      if (response.status === 200) {
        dispatch({ type: "TOGGLE_LOADING" });
        dispatch({ type: "SET_USER", payload: { ...response.data.data } });
      }
    } catch (err) {
      dispatch({ type: "TOGGLE_LOADING" });
      console.log(err);
    }
  };
  const addToHistory = async (videoId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const response = await axios.post(`${baseUrl}/history/add/${videoId}`);
      if (response.status === 200) {
        console.log("HISTORY_VID_RES", response.data.data);
        dispatch({ type: "SET_USER", payload: { ...response.data.data } });
        dispatch({ type: "TOGGLE_LOADING" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };
  const dislikeVideo = async (videoId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const response = await axios.post(`${baseUrl}/likes/remove/${videoId}`);
      if (response.status === 200) {
        dispatch({ type: "SET_USER", payload: { ...response.data.data } });
        dispatch({ type: "TOGGLE_LOADING" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };
  const addNewPlaylist = async (name) => {
    dispatch({ type: "TOGGLE_LOADING" });

    try {
      const response = await axios.post(`${baseUrl}/playlist/new`, { name });
      if (response.status === 200) {
        dispatch({ type: "SET_USER", payload: { ...response.data.data } });
        dispatch({ type: "TOGGLE_LOADING" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };
  const addVideoToPlaylist = async (playlistId, videoId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const response = await axios.post(
        `${baseUrl}/playlist/${playlistId}/add/${videoId}`
      );
      if (response.status === 200) {
        dispatch({ type: "SET_USER", payload: { ...response.data.data } });
        dispatch({ type: "TOGGLE_LOADING" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };
  const removeVideoFromPlaylist = async (playlistId, videoId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const response = await axios.post(
        `${baseUrl}/playlist/${playlistId}/remove/${videoId}`
      );
      if (response.status === 200) {
        dispatch({ type: "SET_USER", payload: { ...response.data.data } });
        dispatch({ type: "TOGGLE_LOADING" });
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };
  const deletePlaylist = async (playlistId) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const response = await axios.post(
        `${baseUrl}/playlist/delete/${playlistId}`
      );

      if (response.status === 200) {
        dispatch({ type: "SET_USER", payload: { ...response.data.data } });
        dispatch({ type: "TOGGLE_LOADING" });
      }
    } catch (err) {
      dispatch({ type: "TOGGLE_LOADING" });
      console.log(err);
    }
  };

  const userReducer = (state, { payload, type }) => {
    switch (type) {
      case "SET_USER":
        localStorage.setItem("user", JSON.stringify({ ...payload }));
        return { ...state, currentUser: { ...payload } };

      case "TOGGLE_LOADING":
        return { ...state, isUserLoading: !state.isUserLoading };

      case "SET_ACCESS_TOKEN":
        return { ...state, accessToken: payload };
      case "SIGNOUT_USER":
        return initialState;
    }
  };

  const signUpUser = async (name, email, password) => {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const res = await axios.post(`${baseUrl}/user/signup`, {
        name: name,
        email: email,
        password: password,
      });
      dispatch({ type: "TOGGLE_LOADING" });
      console.log("res", res);
      if (res.status === 200) {
        dispatch({ type: "SET_USER", payload: { ...res.data.data.user } });
        dispatch({
          type: "SET_ACCESS_TOKEN",
          payload: res.data.data.accessToken,
        });
        localStorage.setItem("accessToken", res.data.data.accessToken);
        return res;
      } else {
        console.log("invalid email or password");
        return res;
      }
    } catch (err) {
      console.log(err);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  };

  const signout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    dispatch({ type: "SIGNOUT_USER" });
  };

  async function loginWithCredentials(email, password) {
    dispatch({ type: "TOGGLE_LOADING" });
    try {
      const response = await axios.post(`${baseUrl}/user/signin`, {
        email,
        password,
      });
      console.log("response", response);
      if (response.status === 200) {
        console.log(response);
        dispatch({ type: "SET_USER", payload: { ...response.data.data.user } });
        dispatch({
          type: "SET_ACCESS_TOKEN",
          payload: response.data.data.accessToken,
        });
        localStorage.setItem("accessToken", response.data.data.accessToken);
      } else {
        console.log("invalid login request");
      }
      dispatch({ type: "TOGGLE_LOADING" });
      return response;
    } catch (err) {
      console.log(err);
      dispatch({ type: "TOGGLE_LOADING" });
    }
  }
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider
      value={{
        loginWithCredentials,
        signUpUser,
        ...state,
        likeVideo,
        dislikeVideo,
        addToHistory,
        resetHistory,
        addNewPlaylist,
        addVideoToPlaylist,
        removeVideoFromPlaylist,
        deletePlaylist,
        signout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
