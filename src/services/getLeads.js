import axios from "axios";
import { serverBaseUrl } from "../endpoints";

export const getLeads = (webhookId) => {
  return axios.get(serverBaseUrl + "/leads/" + webhookId);
};
