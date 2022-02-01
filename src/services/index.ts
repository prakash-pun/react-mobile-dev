import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.metaweather.com/api/"
});

export const getLocationId = async (location: string) => {
  const response = await axiosInstance.get(
    `location/search/?query=${location}`
  );
  if (response.data.length !== 0) {
    return response.data[0].woeid;
  }
};

export const getWeather = async (locationId: number) => {
  const response = await axiosInstance.get(`location/${locationId}/`);
  const data = response.data.consolidated_weather[0];
  const location = response.data.title;
  const weather = data.weather_state_name;
  const temperature = data.max_temp;
  return { location, weather, temperature };
};
