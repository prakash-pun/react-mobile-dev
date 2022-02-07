import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000"
});

export const getTodos = async () => {
  const response = await axiosInstance.get("/todos");
  console.log(response);
  return response;
};
