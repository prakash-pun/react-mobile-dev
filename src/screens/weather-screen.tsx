import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { SearchInput } from "../components";
import { getLocationId, getWeather } from "../services";
import { getImage } from "../utils";

export function WeatherScreen() {
  const [error, setError] = useState(false);
  const [location, setLocation] = useState<any>({
    location: "Pokhara",
    weather: "Clear",
    temperature: 24
  });
  const [loading, setLoading] = useState(false);

  const updateLocation = async (location: string) => {
    setLoading(true);
    const locationId = await getLocationId(location.toLowerCase());
    if (locationId) {
      const { location, weather, temperature } = await getWeather(locationId);
      setLocation({ location, weather, temperature });
      setLoading(false);
      setError(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground
        source={getImage(location.weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          {loading && (
            <ActivityIndicator animating={loading} color="white" size="large" />
          )}
          {!loading && (
            <View>
              {!error ? (
                <View>
                  <Text style={[styles.textStyle, styles.largeText]}>
                    {location.location}
                  </Text>
                  <Text style={[styles.textStyle, styles.smallText]}>
                    {location.weather}
                  </Text>
                  <Text style={[styles.textStyle, styles.largeText]}>
                    {location.temperature}&deg;
                  </Text>
                </View>
              ) : (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}
              <SearchInput
                placeholder="Search any city"
                onSubmit={updateLocation}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E"
  },
  textStyle: {
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontFamily: "AvenirNext-Regular"
      },
      android: {
        fontFamily: "Roboto"
      }
    }),
    color: "white"
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20
  },

  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: "cover"
  }
});
