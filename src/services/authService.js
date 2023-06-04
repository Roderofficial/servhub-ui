import Axios from "axios";
import config from "../config";

export default {
  getCode: async (email) => {
    const res = await Axios.post(`${config.APIURL}/auth/get-code`, { email });
    return res.data;
  },

  login: async (email, code) => {
    const res = await Axios.post(`${config.APIURL}/auth/validate-code`, {
      email,
      code,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return res;
  },
};
