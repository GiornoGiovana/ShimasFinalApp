import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Header } from "./Header";

export const Profile = ({ navigation, route }) => {
  const user = route.params;

  const handlePress = () => {
    navigation.navigate("Editar", user);
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:8000/users/${user.id}`, {
      method: "DELETE",
    });
    if (response.status === 204) {
      navigation.navigate("Iniciar Sesion");
    }
  };

  const handleLogout = () => {
    navigation.navigate("Iniciar Sesion");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.logoutButtom} onPress={handleLogout}>
          <Text style={styles.btnLogoutText}>Cerrar Sesion</Text>
        </TouchableOpacity>
        <Image
          style={styles.logo}
          source={{
            uri:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR1v21htx_BlUiXRN241i6JY4II8GLR6dKh9Q&usqp=CAU",
          }}
        />
        <Text style={styles.username}>{user.name}</Text>
        <Text style={styles.text}>Correo electronico:</Text>
        <Text style={styles.info}>{user.email}</Text>
        <Text style={styles.text}>Edad: </Text>
        <Text style={styles.info}>{user.edad}</Text>
        <View style={styles.optionBtn}>
          <TouchableOpacity style={styles.buttom} onPress={handlePress}>
            <Text style={styles.btnText}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButtom} onPress={handleDelete}>
            <Text style={styles.btnText}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    height: "100%",
    alignItems: "center",
  },
  logo: {
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 50,
    marginTop: 50,
  },
  username: {
    color: "#5a7391",
    fontSize: 35,
    fontWeight: "600",
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
    fontFamily: "Mixa Semi Bold",
  },
  text: {
    color: "#93a3b5",
    fontSize: 25,
    fontWeight: "400",
  },
  info: {
    color: "#5b9bd1",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
    fontFamily: "Cochin",
  },
  buttom: {
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#00acee",
    width: "20%",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButtom: {
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f05454",
    width: "20%",
  },
  optionBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  logoutButtom: {
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ff5722",
    marginTop: 10,
    marginRight: 10,
  },
  btnLogoutText: {
    color: "#19d3da",
  },
});
