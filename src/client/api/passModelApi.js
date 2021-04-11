import axios from "axios";
import qs from "qs"; // part of Axios
import Constants from "../common/Constants";

// To use nested JSON params
axios.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => {
    // this flattens JSON string
    return qs.stringify(params, {
      arrayFormat: "brackets",
    });
  };
  return config;
});

const apiPrimaryRoute = "/guess-api/newPass/";

const url = Constants.url();

export const newPasswords = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(url + apiPrimaryRoute + "getNewPass", {
        params: {},
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

export const verifyPassword = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url + apiPrimaryRoute + "verifyPass", {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
};

