import axios from "axios";
import cookie from "react-cookies";
import moment from "moment";
import { location, history } from "../../components/login/Login";
import { create } from "apisauce";
import { SET_CURRENT_USER } from "./actionTypes";

// const location = useLocation();
// const history = useHistory();

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

const setToken = () => {
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
      // const {userData} = res.data
      console.log(res);
      if (res.data) {
        let exp = moment().add("1", "day");
        cookie.save("SESSION", res, { path: "/", expires: exp.toDate() });
        if (res.data.isLoggedIn) {
          console.log("hello");
          if (setToken()) {
            var prevURL = location.state ? location.state.prevURL : null;
            history.push("/dashborad");
          }
        }
      }
    });
};
