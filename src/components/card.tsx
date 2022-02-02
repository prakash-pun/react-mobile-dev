import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View
} from "react-native";
import { AuthorDetail } from ".";

export function Card({ image, fullName, onPressComments }: any) {
  const [loading, setLoading] = useState(false);

  const handleLoad = (): void => {
    setLoading(false);
  };
  return (
    <View>
      <AuthorDetail
        fullName={fullName}
        linkText={"Comments"}
        onPressLinkText={onPressComments}
      />
      <View style={styles.image}>
        {loading && (
          <ActivityIndicator style={StyleSheet.absoluteFill} size={"large"} />
        )}
        <Image
          style={StyleSheet.absoluteFill}
          source={image}
          onLoad={handleLoad}
        />
      </View>
    </View>
  );
}

export function CardList({ items, commentsForItem, onPressComments }: any) {
  const renderItem = ({ item: { id, author } }: any) => {
    const comments = commentsForItem[id];
    return (
      <Card
        fullName={author}
        image={{ uri: "https://unsplash.it/600/600" }}
        linkText={`${comments ? comments.length : 0} Comments`}
        onPressComments={onPressComments}
      />
    );
  };
  const keyExtractor = ({ id }: any) => id.toString();

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      extraData={commentsForItem}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  absoluteFillStyle: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
});
