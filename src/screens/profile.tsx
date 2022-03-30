import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { getRoutes } from "../services";

export function ProfileScreen({ navigation }: any) {
  const [routes, setRoutes] = useState<any>();
  const colors = ["green", "red"];

  useEffect(() => {
    if (!routes) {
      const routeData = async () => {
        const routes = await getRoutes();
        const routeData = routes.docs.map((doc: any) => ({
          // console.log(doc.data().coordinates);
          ...doc.data(),
          id: doc.id
          // return JSON.parse(doc.data().coordinates);
        }));
        setRoutes(routeData);
      };
      routeData();
    }
  }, [routes]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Weather" onPress={() => navigation.navigate("Weather")} />
      <Button title="Map" onPress={() => navigation.navigate("Map")} />
      <Button
        title="Bottom Sheet"
        onPress={() => navigation.navigate("Bottom")}
      />
      <Button
        title="Bottom Modal"
        onPress={() => navigation.navigate("Bottom-Modal")}
      />
      <Text>Profile Screen</Text>
      {routes && routes.length
        ? routes.map((data: any, index: number) => (
            <View key={index}>
              <Text>{data.startPoint}</Text>
            </View>
          ))
        : null}
    </View>
  );
}
