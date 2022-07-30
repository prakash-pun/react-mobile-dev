import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../config";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000"
});

export const getTodos = async () => {
  const response = await axiosInstance.get("/todos");
  return response;
};

const routesCollectionRef = collection(database, "routes");

const getRoutes = async () => {
  const data = await getDocs(routesCollectionRef);

  return data;
};

export { getRoutes };
