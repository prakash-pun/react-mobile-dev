import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import InputForm from "../components/form";
import Header from "../components/header";
import TodoList from "../components/todo-list";

export function HomeScreen() {
  const [todos, setTodoList] = useState<any>();
  const [toggle, setToggle] = useState<any>(false);

  useEffect(() => {
    setTodoList([
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
        isCompleted: true
      }
    ]);
  }, [toggle]);

  const addTodo = (todo: string): void => {
    if (todo) {
      todos.push({
        id: (todos.length + 1).toString(),
        todo: todo,
        isCompleted: false
      });
    }
  };

  const handleStatus = (todoId: string): void => {
    if (todoId) {
      const updateTodo = todos.map((item: any) => {
        if (item.id == todoId) {
          item.isCompleted = !item.isCompleted;
        }
        return todos;
      });
      setTodoList(updateTodo[0]);
      setToggle(!toggle);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header />
      <View style={styles.line} />
      <TodoList todos={todos} handleStatus={handleStatus} />
      <InputForm todos={todos} onSubmit={addTodo} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(26, 32, 44)",
    paddingTop: "5%",
    height: "100%"
  },
  line: {
    paddingTop: "5%",
    borderBottomColor: "white",
    borderBottomWidth: 1
  },
  addBtn: {
    backgroundColor: "#677bc4",
    marginLeft: "5%",
    marginBottom: "10%",
    marginRight: "5%",
    marginTop: "5%",
    padding: "2%",
    borderRadius: 10
  }
});
