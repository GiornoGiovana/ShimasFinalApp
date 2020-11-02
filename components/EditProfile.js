import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Header } from "./Header";

export const EditProfile = ({ route, navigation }) => {
  const user = route.params;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEdit = async () => {
    const data = {
      name: username,
      email: email,
      password: password,
    };
    const res = await fetch(`http://localhost:8000/users/${user.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newUser = await res.json();
    if (res.status == 202) {
      alert("Tu perfil a sido actializado");
      navigation.navigate("Profile", newUser);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Editar Perfil</Text>
        <Text style={styles.text}>Nombre de Usuario: </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text style={styles.text}>Correo: </Text>
        <TextInput
          style={styles.textInput}
          textContentType="emailAddress"
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
        <TouchableOpacity style={styles.buttom} onPress={handleEdit}>
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttom}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.btnText}>Cancelar</Text>
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
    marginBottom: 20,
    borderBottomColor: "#1f6f8b",
    borderBottomWidth: 1,
  },
  buttom: {
    alignSelf: "stretch",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffa62b",
    marginTop: 10,
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
    marginBottom: 30,
    color: "#01c5c4",
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
    fontFamily: "Comic Sans MS",
  },
});
