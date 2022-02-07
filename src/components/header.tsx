import { Text, View, StyleSheet, Image } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image source={require("../assets/doge.jpg")} style={styles.image} />
      <Text style={styles.appName}>Mero Todo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center"
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 20
  },
  appName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  }
});
