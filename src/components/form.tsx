import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export default function InputForm({ todos, onSubmit }: any) {
  const [text, setText] = useState<string>("");

  const handleChangeText = (todo: string): void => {
    setText(todo);
  };

  const handleSubmitEditing = (): void => {
    if (!text) return;

    onSubmit(text);
    setText("");
  };
  return (
    <SafeAreaView style={styles.formContainer}>
      <TextInput
        placeholderTextColor={"white"}
        placeholder="Add your todo"
        style={styles.form}
        value={text}
        underlineColorAndroid="transparent"
        clearButtonMode="always"
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
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
