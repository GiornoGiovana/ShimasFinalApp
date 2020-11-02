import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password,
    };
    const response = await fetch("http://localhost:8000/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      const user = await response.json();
      navigation.navigate("MyTabs", user);
    } else {
      alert("Usuario no encontrado");
    }
  };

  const handleSignup = () => {
    navigation.navigate("Registrarse");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bienvenido a SHIMAS!</Text>
        <Text style={styles.text}>Correo: </Text>
        <TextInput
          underlineColorAndroid={"transparent"}
          style={styles.textInput}
          textContentType="emailAddress"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.text}>Contraseña: </Text>
        <TextInput
          underlineColorAndroid={"transparent"}
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.buttom} onPress={handleLogin}>
          <Text style={styles.btnText}>Iniciar Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttom} onPress={handleSignup}>
          <Text style={styles.btnText}>
            No registrado aun? Registrate ahora!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
    width: "30%",
  },
  textInput: {
    fontSize: 20,
    fontFamily: "Cochin",
    alignSelf: "stretch",
    height: 40,
    marginBottom: 30,
    borderBottomColor: "#1f6f8b",
    borderBottomWidth: 1,
  },
  buttom: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffa62b",
    marginTop: 30,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    marginBottom: 20,
    color: "#01c5c4",
    fontSize: 23,
  },
  title: {
    marginBottom: 50,
    color: "#01c5c4",
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "Comic Sans MS",
  },
});
