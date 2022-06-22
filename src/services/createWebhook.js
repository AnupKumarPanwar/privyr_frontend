import axios from "axios";
import { serverBaseUrl } from "../endpoints";

export const createWebhook = (name, userId) => {
  return axios.post(serverBaseUrl + "/webhook", {
    name: name,
    user_id: userId,
  });
};
