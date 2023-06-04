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
        console.log(res);
        localStorage.setItem("token", res.data.access_token);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return res;
  },
};
