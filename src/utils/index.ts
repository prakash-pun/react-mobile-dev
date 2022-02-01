export const getImage = (weather: string) => {
  if (weather === "Clear") {
    return require("../assets/clear.webp");
  } else if (weather === "Showers") {
    return require("../assets/shower.jpg");
  } else if (weather === "Heavy Cloud") {
    return require("../assets/heavy-cloud.jpg");
  }
};
