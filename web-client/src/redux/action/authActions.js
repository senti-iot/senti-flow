import axios from "axios";
import cookie from "react-cookies";
import moment from "moment";
import { create } from "apisauce";
import { SET_CURRENT_USER, SET_CURRENT_PROFILE } from "./actionTypes";

let backendHost, sentiAPI;

const hostname = window && window.location && window.location.hostname;

if (hostname === "console.senti.cloud") {
  backendHost = "https://senti.cloud/rest/";
  sentiAPI = "https://api.senti.cloud/";
} else if (hostname === "beta.senti.cloud") {
  backendHost = "https://betabackend.senti.cloud/rest/";
  sentiAPI = "https://dev.api.senti.cloud/";
} else {
  backendHost = "https://betabackend.senti.cloud/rest/";
  sentiAPI = "https://dev.api.senti.cloud/";
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

export const loginApi = create({
  baseURL: backendHost,
  timout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export const setToken = () => {
  try {
    var OAToken = cookie.load("SESSION").sessionID;
    api.setHeader("ODEUMAuthToken", OAToken);
    imageApi.setHeader("ODEUMAuthToken", OAToken);
    return true;
  } catch (error) {
    return false;
  }
};
setToken();

export const loginUser = userData => dispatch => {
  axios
    .post(
      "https://betabackend.senti.cloud/rest/odeum/auth/organization",
      userData
    )
    .then(res => {
      if (res.data) {
        let exp = moment().add("1", "day");
        cookie.save("SESSION", res, { path: "/", expires: exp.toDate() });
        if (res.data.isLoggedIn) {
          if (setToken()) {
            dispatch(setCurrentUser(res.data));

            const sessionHeader = create({
              baseURL: backendHost,
              timeout: 30000,
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                ODEUMAuthToken: res.data.sessionID
              }
            });

            axios
              .get(
                "https://betabackend.senti.cloud/rest/core/user/" +
                  res.data.userID,
                sessionHeader
              )
              .then(res => {
                dispatch(setCurrentProfile(res.data));
              });
          }
        }
      }
    });
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const setCurrentProfile = profile => {
  return {
    type: SET_CURRENT_PROFILE,
    payload: profile
  };
};

export const logOut = () => async dispatch => {
  var session = cookie.load("SESSION");
  var data = await loginApi.delete(`odeum/auth/${session.sessionID}`);
  cookie.remove("SESSION");
  dispatch(setCurrentUser({}));
  dispatch(setCurrentProfile({}));
};
