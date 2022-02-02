import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export function Avatar({ size, backgroundColor, initials }: any) {
  const style = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor
  };
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
}

export function AuthorDetail({ fullName, linkText, onPressLinkText }: any) {
  return (
    <View style={styles.authorContainer}>
      <Avatar size={35} initials={"PP"} backgroundColor={"teal"} />
      <Text style={styles.authorText} numberOfLines={1}>
        {fullName}
      </Text>
      {!!linkText && (
        <TouchableOpacity onPress={onPressLinkText}>
          <Text numberOfLines={1}>{linkText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center"
  },
  authorContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10
  },
  text: {
    color: "white"
  },
  authorText: {
    flex: 1,
    marginHorizontal: 6,
    color: "black"
  }
});
