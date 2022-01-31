import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import InputForm from "../components/form";
import Header from "../components/header";
import TodoList from "../components/todo-list";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.line} />
      <InputForm />
      <TodoList />
      <TouchableOpacity
        onPress={() => alert("Hello, world!")}
        style={styles.addBtn}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          Add Todo
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(26, 32, 44)",
    paddingTop: "20%",
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
    marginBottom: "20%",
    marginRight: "5%",
    marginTop: "5%",
    padding: "2%",
    borderRadius: 10
  }
});
