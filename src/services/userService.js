import axios from "axios";
import config from "../config";

export default {
  getUser: async (id) => {
    const res = await axios.get(`${config.APIURL}/user/${id}`);
    return res.data;
  },

  getMe: async () => {
    const res = await axios.get(`${config.APIURL}/user/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },
};
