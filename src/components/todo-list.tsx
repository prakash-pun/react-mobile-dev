import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

export default function TodoList() {
  const [isChecked, setChecked] = useState(false);
  const todos = [
    {
      id: "1",
      todo: "Create React Native App",
      isCompleted: false
    },
    {
      id: "2",
      todo: "Read all the React native docs",
      isCompleted: false
    },
    {
      id: "3",
      todo: "Implement examples in your app",
      isCompleted: false
    },
    {
      id: "4",
      todo: "keep working",
      isCompleted: false
    }
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Checkbox
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#4630EB" : undefined}
              style={styles.status}
            />
            <Text style={styles.todo}>{item.todo}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
    width: "100%"
  },
  todoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  todo: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: "white"
  },

  status: {
    padding: 5,
    fontSize: 10
  }
});
