import Axios from "axios";
import config from "../config";

export default {
  getServers: async () => {
    const res = await Axios.get(`${config.APIURL}/server`);
    console.log(res.data);
    return res.data;
  },

  getServer: async (id) => {
    const res = await Axios.get(`${config.APIURL}/server/${id}`);
    return res.data;
  },

  addServer: async (server) => {
    const res = await Axios.post(`${config.APIURL}/server/create`, server);
    return res;
  },

  getGameServers: async (id, page = 1, lang = null) => {
    const res = await Axios.post(`${config.APIURL}/server/list/`, {
      gameId: id,
      page: page,
    });
    return res.data;
  },

  getOwnershipServerRequestName: async (id) => {
    const res = await Axios.get(
      `${config.APIURL}/server/ownership-server-name/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data.name;
  },

  requestOwnership: async (id) => {
    const res = await Axios.post(`${config.APIURL}/server/take-ownership/`, {
      serverId: id,
    });
    return res;
  },
};
