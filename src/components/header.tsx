import { Text, View, StyleSheet, Image } from "react-native"
// import { doge } from "../assets/doge.jpg";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image source={require("../assets/doge.jpg")} style={styles.image} />
      <Text style={styles.appName}>Mero Todo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center"
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
    marginLeft: 20
  },
  appName: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold"
  }
})
