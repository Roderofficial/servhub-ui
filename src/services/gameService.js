import Axios from "axios";
import config from "../config";

export default {
  getGames: async () => {
    const res = await Axios.get(`${config.APIURL}/game`);
    return res.data;
  },

  getGame: async (id) => {
    const res = await Axios.get(`${config.APIURL}/game/${id}`);
    return res.data;
  },
};
