/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Dimensions,
  AppState,
  Platform,
  Linking,
  View,
  Button
} from "react-native";
import MapView, { Marker, Callout, Circle, Geojson } from "react-native-maps";
import * as Location from "expo-location";
import * as IntentLauncher from "expo-intent-launcher";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import Modal from "react-native-modal";
import { coordinates, secondCoordinates } from "../utils/point";
import { getRoutes } from "../services";

const myPlace: any = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: coordinates
      }
    },
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [83.98065, 28.22565]
      }
    }
  ]
};

const geojson: any = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: secondCoordinates
      }
    }
  ]
};

const Map = () => {
  const [pin, setPin] = useState({
    latitude: 28.2329188,
    longitude: 83.9819055
  });
  const [location, setLocation] = useState<any>(null);
  const [region, setRegion] = useState<any>({
    latitude: 28.2329188,
    longitude: 83.9819055
  });
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState<any>(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [_openSetting, setOpenSetting] = useState(true);
  const coordinates = [
    { latitude: 28.2329188, longitude: 83.9819055 },
    { latitude: 28.213356890291745, longitude: 83.97138118743898 }
  ];
  console.log("11", process.env.REACT_GOOGLE_MAPS_APIKEY);

  const GOOGLE_MAPS_APIKEY = "google-maps-apikey";

  const handleAppStateChange = useCallback(
    (nextAppState: any) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        console.log("App has come to foreground");
        getLocationAsync();
      }
      setAppState(nextAppState);
    },
    [appState]
  );

  useEffect(() => {
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
      console.log("will unmount");
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work in an Android emulator. Try it on your device!"
      );
    } else {
      getLocationAsync();
    }
  }, [handleAppStateChange]);

  const getLocationAsync = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    } catch {
      const status = await Location.getProviderStatusAsync();
      if (!status.locationServicesEnabled) {
        setIsModalVisible(true);
      }
    }
  };

  const openSetting = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.LOCATION_SOURCE_SETTINGS
      );
    }
    setIsModalVisible(false);
  };

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [routes, setRoutes] = useState<any>();
  const colors = ["green", "red"];

  useEffect(() => {
    if (!routes) {
      const routeData = async () => {
        const routes = await getRoutes();
        const routeData = routes.docs.map((doc: any) => ({
          // console.log(doc.data().coordinates);
          ...doc.data(),
          id: doc.id
          // return JSON.parse(doc.data().coordinates);
        }));
        setRoutes(routeData);
      };
      routeData();
    }
  }, [routes]);
  return (
    <SafeAreaView>
      <Text>{text}</Text>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance"
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: "",
          language: "en",
          components: "country:np",
          type: "establishment",
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`
        }}
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1
          },
          listView: { backgroundColor: "white" }
        }}
      />
      <Modal
        isVisible={isModalVisible}
        onModalHide={_openSetting ? openSetting : undefined}
      >
        <View
          style={{
            height: 300,
            width: 300,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            onPress={() => {
              setOpenSetting(true);
              setIsModalVisible(false);
            }}
            title="Enable Location Services"
          />
        </View>
      </Modal>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.2329188,
          longitude: 83.9819055,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        provider="google"
      >
        <Marker
          coordinate={pin}
          pinColor="black"
          draggable={true}
          onDragStart={(e: any) => {
            console.log("Drag start", e.nativeEvent.coordinates);
          }}
          onDragEnd={(e: any) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude
            });
          }}
        >
          <Callout>
            <Text>I am here</Text>
          </Callout>
        </Marker>
        <Geojson
          geojson={myPlace}
          strokeColor="#3265b8"
          fillColor="green"
          strokeWidth={4}
        />
        <Geojson
          geojson={geojson}
          strokeColor="red"
          fillColor="green"
          strokeWidth={4}
          onPress={(data: any) => {
            console.log(data);
          }}
        />
        {routes && routes.length
          ? routes.map((data: any, index: number) => (
              <Geojson
                key={index}
                geojson={{
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      properties: {},
                      geometry: {
                        type: "LineString",
                        coordinates: JSON.parse(data.coordinates)
                      }
                    }
                  ]
                }}
                strokeColor={colors[index]}
                fillColor="green"
                strokeWidth={4}
              />
            ))
          : null}
      </MapView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: "tomato"
  }
});

export { Map };
