import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const ToolbarButton = ({ title, onPress }: any) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

export function Toolbar({
  onPressCamera,
  onPressLocation,
  onSubmit,
  isFocused,
  onChangeFocus
}: any) {
  const [text, setText] = useState("");
  const input: any = useRef();

  useEffect(() => {
    const changeFocus = (nextProps: any) => {
      if (nextProps.isFocused !== isFocused) {
        if (nextProps.isFocused) {
          input.current.focus();
        } else {
          input.current.blur();
        }
      }
    };
    changeFocus(isFocused);
  }, []);

  const handleFocus = () => {
    onChangeFocus(true);
  };
  const handleBlur = () => {
    onChangeFocus(false);
  };

  const handleChangeText = (text: string) => {
    setText(text);
  };

  const handleSubmitEditing = () => {
    if (!text) return;
    onSubmit(text);
    setText("");
  };
  return (
    <View style={styles.toolbar}>
      <ToolbarButton title={"C"} onPress={onPressCamera} />
      <ToolbarButton title={"L"} onPress={onPressLocation} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          underlineColorAndroid={"transparent"}
          placeholder="Type something"
          blurOnSubmit={false}
          value="text"
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          ref={input}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: "white"
  },
  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: "grey"
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.02)"
  },
  input: {
    flex: 1,
    fontSize: 18
  }
});
