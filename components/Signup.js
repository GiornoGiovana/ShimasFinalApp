import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export const Signup = ({ navigation }) => {
  const [username, setUsermame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePress = async () => {
    const data = {
      name: username,
      email: email,
      password: password,
    };
    const res = await fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.statusText == "Created") {
      const user = await res.json();
      navigation.navigate("Quiz", user);
    } else {
      alert("El correo ya esta registrado, pruebe con otro");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bienvenido a SHIMAS!</Text>
        <Text style={styles.text}>Nombre de Usuario:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setUsermame(text)}
          value={username}
        />
        <Text style={styles.text}>Correo:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.text}>Contraseña: </Text>
        <TextInput
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.buttom} onPress={handlePress}>
          <Text style={styles.btnText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#fff",
    justifyContent: "center",
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
