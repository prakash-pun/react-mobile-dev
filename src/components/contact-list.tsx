import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ContactList({ name, picture, phone }: any) {
  const uri = picture.large;
  const handleOnPress = () => {
    console.log("hello click");
  };
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri }}></Image>
      <TouchableOpacity onPress={handleOnPress}>
        <View style={styles.contactInfo}>
          <Text style={styles.name}>
            {name.first} {name.last}
          </Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 2,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.10)"
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50
  },
  contactInfo: {
    paddingLeft: 10
  },
  name: {
    fontWeight: "700"
  },
  phone: {
    color: "#424cbd"
  }
});
