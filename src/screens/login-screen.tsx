import React, { useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity
} from "react-native";
import { AuthContext } from "../context/auth";

export function Login() {
  const { setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const handleChangeEmail = (email: string): void => {
    setData({ ...data, email: email });
  };
  const handleChangePassword = (password: string): void => {
    setData({ ...data, password: password });
  };

  const handleSubmit = () => {
    setLoading(true);
    if (data.email !== "" && data.password !== "") {
      setAuth(true);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        value={data.email}
        onChangeText={handleChangeEmail}
        autoCorrect={false}
        placeholder="Email"
        underlineColorAndroid="transparent"
        placeholderTextColor={"black"}
        style={styles.textInput}
        clearButtonMode="always"
      />
      <TextInput
        value={data.password}
        onChangeText={handleChangePassword}
        secureTextEntry={true}
        autoCorrect={false}
        placeholder="Password"
        underlineColorAndroid="transparent"
        placeholderTextColor={"black"}
        textContentType={"password"}
        style={styles.textInput}
        clearButtonMode="always"
      />
      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text
          style={{ textAlign: "center", fontWeight: "700", color: "white" }}
        >
          {loading ? "Loading" : "Login"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginLeft: "5%",
    marginBottom: "10%",
    marginRight: "5%",
    marginTop: "5%"
  },
  textInput: {
    color: "black",
    fontSize: 15,
    height: 44,
    borderColor: "black",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 8
  },
  loginBtn: {
    backgroundColor: "#677bc4",
    padding: "3.5%",
    borderRadius: 10,
    marginTop: 10,
    textAlign: "center"
  }
});
