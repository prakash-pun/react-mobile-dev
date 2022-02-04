import React, { useEffect, useReducer, useCallback } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Platform
} from "react-native";
import Constants from "expo-constants";
import { getList } from "../api";
import { actionCreators, initialState, reducer } from "../reducers";
import { PhotoGrid } from "../components";

export function PhotoLibrary() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { photos, nextPage, loading, error } = state;

  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading());

    try {
      const nextPhotos = await getList(nextPage);
      dispatch(actionCreators.success(nextPhotos, nextPage));
    } catch (e) {
      dispatch(actionCreators.failure());
    }
  }, [nextPage]);

  useEffect(() => {
    fetchPhotos();
  }, []);

  // We'll show an error only if the first page fails to load
  if (photos.length === 0) {
    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.container}>
          <Text>Failed to load photos!</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <PhotoGrid numColumns={3} photos={photos} onEndReached={fetchPhotos} />
    </View>
  );
}

const platformVersion =
  Platform.OS === "ios" ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop:
      Platform.OS === "ios" && platformVersion > 11
        ? Constants.statusBarHeight
        : 0
  }
});
