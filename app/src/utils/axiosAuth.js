import axios from "axios";

const axiosAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      authorization: token ? token : ""
    }
  });
};

export default axiosAuth;
