import React, { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

export default function TodoList({ todos, handleStatus }: any) {
  const keyExtractor = (item: any) => item.id;
  const onChange = (id: string) => {
    handleStatus(id);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Checkbox
              color="#4630EB"
              style={styles.status}
              value={item.isCompleted}
              onValueChange={() => onChange(item.id)}
            />
            <Text
              style={[
                styles.todo,
                item.isCompleted && { textDecorationLine: "line-through" }
              ]}
            >
              {item.todo}
            </Text>
          </View>
        )}
        keyExtractor={keyExtractor}
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
