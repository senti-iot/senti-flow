import axios from "axios";
import { SET_CURRENT_USER } from "./actionTypes";

export const loginUser = userData => dispatch => {
  axios
    .post(
      "https://betabackend.senti.cloud/rest/odeum/auth/organization",
      userData
    )
    .then(res => {
      // const {userData} = res.data
      console.log(res);
    });
};
