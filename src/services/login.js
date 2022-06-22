import axios from "axios";
import { serverBaseUrl } from "../endpoints";

export const login = (email) => {
  return axios.post(serverBaseUrl + "/login", {
    email: email,
  });
};
