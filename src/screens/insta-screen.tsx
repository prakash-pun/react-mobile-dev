import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Constant from "expo-constants";
import { CardList } from "../components";

export function InstaScreen({ style, commentsForItem, onPressComments }: any) {
  const items = [
    { id: 0, author: "Prakash Pun" },
    { id: 1, author: "Bishal Pun" }
  ];
  return (
    <SafeAreaView style={style}>
      <CardList
        items={items}
        commentsForItem={commentsForItem}
        onPressComments={onPressComments}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff"
  }
});
