import { Platform, View } from "react-native";
import { HomeScreen } from "./src/screens/home-screen";
import { WeatherScreen } from "./src/screens/weather-screen";

export default function App() {
  return <>{Platform.OS === "ios" ? <WeatherScreen /> : <HomeScreen />}</>;
}
