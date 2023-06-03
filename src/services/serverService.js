import Axios from "axios";
import config from "../config";

export default {
  getServers: async () => {
    const res = await Axios.get(`${config.APIURL}/server`);
    console.log(res.data);
    return res.data;
  },

  addServer: async (server) => {
    const res = await Axios.post(`${config.APIURL}/server/create`, server);
    return res;
  },
};
