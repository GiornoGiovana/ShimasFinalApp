import React, { useState } from "react";
import {
  Picker,
  StyleSheet,
  Text,
  View,
  CheckBox,
  TouchableOpacity,
} from "react-native";
import { Header } from "./Header";

export const Quiz = ({ route, navigation }) => {
  const user = route.params;
  const [toggle, setToggle] = useState({
    movie: false,
    exercise: false,
    cook: false,
  });
  const [activityType, setActivityType] = useState({
    movie: "Action",
    exercise: "Aerobicos",
    cook: "Tradicional",
  });

  const handlePress = async () => {
    const data = {
      activity_name: toggle.movie
        ? "Ver peliculas/series"
        : toggle.exercise
        ? "Hacer ejercicios"
        : "Cocinar",
      activity_type: toggle.movie
        ? activityType.movie
        : toggle.exercise
        ? activityType.exercise
        : activityType.cook,
      user: user.id,
    };
    const response = await fetch("http://localhost:8000/activity/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status == 201) {
      navigation.navigate("MyTabs", user);
    } else {
      alert("Eres gil");
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Registro de actividades preferidas!</Text>
      <Text style={styles.secondTitle}>Actividades: </Text>
      <View style={styles.mainCotainer}>
        <View style={styles.activityContainer}>
          <CheckBox
            disabled={false}
            value={toggle.movie}
            onValueChange={(newValue) =>
              setToggle((prev) => ({ ...prev, movie: newValue }))
            }
          />
          <Text style={styles.activity}>Ver Peliculas/Series</Text>
        </View>
        <View style={styles.activityContainer}>
          <CheckBox
            disabled={false}
            value={toggle.exercise}
            onValueChange={(newValue) =>
              setToggle((prev) => ({ ...prev, exercise: newValue }))
            }
          />
          <Text style={styles.activity}>Hacer Ejercicios</Text>
        </View>
        <View style={styles.activityContainer}>
          <CheckBox
            disabled={false}
            value={toggle.cook}
            onValueChange={(newValue) =>
              setToggle((prev) => ({ ...prev, cook: newValue }))
            }
          />
          <Text style={styles.activity}>Cocinar</Text>
        </View>
      </View>
      <Text style={styles.secondTitle}>Tipo de Actividades: </Text>
      <View style={styles.pickerCotainer}>
        <Picker
          style={styles.picker}
          selectedValue={activityType.movie}
          onValueChange={(itemValue) =>
            setActivityType((prev) => ({ ...prev, movie: itemValue }))
          }
        >
          <Picker.Item label="Adventure" value="Adventure" />
          <Picker.Item label="Crime" value="Crime" />
          <Picker.Item label="Thriller" value="Thriller" />
          <Picker.Item label="Action" value="Action" />
          <Picker.Item label="Fantasy" value="Fantasy" />
          <Picker.Item label="Family" value="Family" />
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={activityType.exercise}
          onValueChange={(itemValue) =>
            setActivityType((prev) => ({ ...prev, exercise: itemValue }))
          }
        >
          <Picker.Item label="Aerobicos" value="Aerobicos" />
          <Picker.Item label="Flexibilidad" value="Flexibilidad" />
          <Picker.Item label="Furza" value="Fuerza" />
          <Picker.Item label="Resistencia" value="Resistencia" />
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={activityType.cook}
          onValueChange={(itemValue) =>
            setActivityType((prev) => ({ ...prev, cook: itemValue }))
          }
        >
          <Picker.Item label="Cocina Tradicional" value="Tradicional" />
          <Picker.Item label="Alta cocina" value="Terror" />
          <Picker.Item label="Cocina Fusion" value="Fusion" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.buttom} onPress={handlePress}>
        <Text style={styles.btnText}>Guardar y Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainCotainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 40,
    marginTop: 20,
  },
  buttom: {
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffa62b",
    marginTop: 60,
    width: "60%",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  activityContainer: {
    display: "flex",
    flexDirection: "row",
  },
  activity: {
    marginLeft: 20,
    fontSize: 20,
    color: "#68b0ab",
    fontWeight: "600",
  },
  title: {
    alignSelf: "center",
    margin: 10,
    marginTop: 60,
    fontSize: 20,
    fontFamily: "Comic Sans MS",
    color: "#382933",
    fontWeight: "800",
  },
  secondTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "700",
    alignSelf: "center",
    color: "#0f3460",
  },
  pickerCotainer: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  picker: {
    width: 200,
    backgroundColor: "#b7efcd",
    borderColor: "#322f3d",
    borderWidth: 1,
    color: "#393e46",
    fontFamily: "sans-serif-light",
  },
});
