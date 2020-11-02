import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Header } from "./Header";

export const Profile = ({ navigation, route }) => {
  const user = route.params;

  const handlePress = () => {
    navigation.navigate("Editar", user);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.profileContainer}>
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
        <TouchableOpacity style={styles.buttom} onPress={handlePress}>
          <Text style={styles.btnText}>Editar perfil</Text>
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
  profileContainer: {
    flex: 1,
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
    marginTop: 30,
    width: "30%",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
