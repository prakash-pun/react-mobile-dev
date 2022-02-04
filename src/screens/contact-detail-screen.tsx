import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

export default function ContactDetailScreen() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(count => count + 1), 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.contactHeader}>
        <Image
          style={styles.image}
          source={{ uri: "https://randomuser.me/api/portraits/women/3.jpg" }}
        />
        <Text style={styles.name}>Prakash Pun</Text>
        <Text style={styles.phone}>📞9816106906</Text>
      </View>
      <View style={styles.contactDetail}>
        <View style={styles.contactRow}>
          <Text style={styles.icon}>📧</Text>
          <View style={styles.contactText}>
            <Text style={{ fontWeight: "700" }}>Email</Text>
            <Text>poonprakash22@gmail.com</Text>
          </View>
        </View>
        <View style={styles.contactRow}>
          <Text style={styles.icon}>📞</Text>
          <View style={styles.contactText}>
            <Text style={{ fontWeight: "700" }}>Work</Text>
            <Text>981609698</Text>
          </View>
        </View>
        <View style={styles.contactRow}>
          <Text style={styles.icon}>📱</Text>
          <View style={styles.contactText}>
            <Text style={{ fontWeight: "700" }}>Personal</Text>
            <Text>9834598734</Text>
            <Text style={{ fontSize: 50 }}>{count}</Text>
            <Button color="#1ACDA5" title="Hello" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight
  },
  contactHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#535cbd",
    height: 200
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: 10
  },
  name: {
    color: "white",
    fontWeight: "700"
  },
  phone: {
    color: "white"
  },
  contactDetail: {
    paddingLeft: 10,
    paddingRight: 10
  },
  contactRow: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 2,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.10)"
  },
  icon: {
    fontSize: 20
  },
  contactText: {
    paddingLeft: 10
  }
});

// Wv21s3HXjeYrptJ3CH8VAWYh0Xi2;
// XwYqswkMdMcK3CloUrbFygFZokB3;
