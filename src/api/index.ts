import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://picsum.photos/v2"
});

const BASE_URL = `https://picsum.photos/v2`;

export async function getList(page = 1) {
  const response = await axiosInstance.get(`/list?page=${page}`);
  const photos = await response.data;
  return photos;
}

export function formatPhotoUri(id: any, width: any, height: any) {
  return `https://picsum.photos/id/${id}/${Math.floor(width)}/${Math.floor(
    height
  )}`;
}
