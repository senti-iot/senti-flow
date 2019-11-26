import cookie from "react-cookies";
import moment from "moment";
import { create } from "apisauce";
import {
  SET_CURRENT_USER,
  LOGIN_USER,
  LOGOUT_USER,
  SET_ERROR
} from "./actionTypes";

let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "console.senti.cloud") {
  backendHost = "https://senti.cloud/rest/";
} else if (hostname === "beta.senti.cloud") {
  backendHost = "https://betabackend.senti.cloud/rest/";
} else {
  backendHost = "https://betabackend.senti.cloud/rest/";
}

const api = create({
  baseURL: backendHost,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    ODEUMAuthToken: ""
  }
});

const imageApi = create({
  baseURL: backendHost,
  timeout: 30000,
  headers: {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Content-Type": "multipart/form-data",
    ODEUMAuthToken: ""
  }
});

export const setToken = () => {
  try {
    var OAToken = cookie.load("SESSION").data.sessionID;
    api.setHeader("ODEUMAuthToken", OAToken);
    imageApi.setHeader("ODEUMAuthToken", OAToken);
    return true;
  } catch (error) {
    return false;
  }
};
setToken();

export const loginUser = userData => async dispatch => {
  await api
    .post(`odeum/auth/organization`, userData)
    .then(res => {
      if (res.data.isLoggedIn) {
        let exp = moment().add("1", "day");
        cookie.save("SESSION", res, { path: "/", expires: exp.toDate() });
        if (setToken()) {
          dispatch(setUser());
        }
      }
    })
    .catch(() => dispatch(setError({ message: "Invalid credentials" })));
};

export const getUser = () => async dispatch => {
  if (cookie.load("SESSION")) {
    const userID = cookie.load("SESSION").data.userID;
    await api.get(`/core/user/${userID}`).then(res => {
      dispatch(setUserInfo(res.data));
    });
  }
};

export const setUserInfo = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
    loading: false
  };
};

export const setUser = () => {
  return {
    type: LOGIN_USER,
    isAuthenticated: true
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
    isAuthenticated: false
  };
};

export const logOut = () => async dispatch => {
  var session = cookie.load("SESSION");
  await api.delete(`odeum/auth/${session.sessionID}`);
  cookie.remove("SESSION");
  dispatch(logoutUser({}));
  dispatch(setUserInfo({}));
  dispatch(setUser({}));
};

export const validateSession = async () => {
  if (cookie.load("SESSION") && cookie.load("SESSION").data.sessionID != null) {
    const sessionID = cookie.load("SESSION").data.sessionID;
    const userID = cookie.load("SESSION").data.userID;
    if (sessionID && userID) {
      await api.get(`/core/user/${userID}`).then(rs => {
        if (rs.status === 200) {
          cookie.load("SESSION");
        } else {
          logOut();
          cookie.remove("SESSION");
        }
      });
    }
  } else {
    logOut();
  }
};

export const setError = error => {
  return {
    type: SET_ERROR,
    payload: error
  };
};
