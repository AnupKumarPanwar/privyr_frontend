import axios from "axios";
import { serverBaseUrl } from "../endpoints";

export const getWebhooks = (userId) => {
  return axios.get(serverBaseUrl + "/webhook/" + userId);
};
