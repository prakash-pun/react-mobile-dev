import React from "react";
import { View, Text, Button } from "react-native";

export function ProfileScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Weather" onPress={() => navigation.navigate("Weather")} />
      <Button title="Map" onPress={() => navigation.navigate("Map")} />
      <Text>Profile Screen</Text>
    </View>
  );
}
