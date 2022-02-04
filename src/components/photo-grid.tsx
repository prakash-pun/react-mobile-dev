import React from "react";
import { Dimensions, FlatList, Image, StyleSheet } from "react-native";
import { formatPhotoUri } from "../api";

export function PhotoGrid({ photos, numColumns, onEndReached }: any) {
  const { width } = Dimensions.get("window");

  const size = width / numColumns;

  return (
    <FlatList
      data={photos}
      keyExtractor={item => item.id}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <Image
          source={{
            width: size,
            height: size,
            uri: formatPhotoUri(item.id, size, size)
          }}
        />
      )}
    />
  );
}
