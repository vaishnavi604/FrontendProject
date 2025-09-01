import axios from "axios";

export const rechargePlan = async (data) => {
  const response = await axios.post("http://localhost:8084/api/api/recharges", data);
  return response.data;
};