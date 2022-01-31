import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export default function InputForm() {
  return (
    <SafeAreaView style={styles.formContainer}>
      <TextInput
        placeholderTextColor={"white"}
        placeholder="Add your todo"
        style={styles.form}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: "4%",
    marginBottom: "2%"
  },
  form: {
    height: 50,
    color: "white",
    borderColor: "white",
    borderRadius: 10,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 17
  }
});
