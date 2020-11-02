import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  CheckBox,
  Picker,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Header } from "./Header";

export const Filter = ({ navigation, route }) => {
  const user = route.params;

  const [toggle, setToggle] = useState({
    time: false,
    type: false,
  });
  const [myType, setMyType] = useState("");
  const [number, setNumber] = useState(0);
  const [time, setTime] = useState("minutos");

  const handleFilter = async () => {
    const response = await fetch(
      `http://localhost:8000/recommendation/filter/${user.id}/${number}/`
    );
    if (response.status == 200) {
      const data = await response.json();
      if (data) {
        navigation.navigate("Actividades Filtradas", data);
      }
    } else {
      alert("Actividad no encontrada");
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.filterContainer}>
        <View style={styles.timeContainer}>
          <View style={styles.timeHeader}>
            <CheckBox
              disabled={false}
              value={toggle.time}
              onValueChange={(newValue) =>
                setToggle((prev) => ({ ...prev, time: newValue }))
              }
            />
            <Text style={styles.label}>Tiempo disponible: </Text>
          </View>
          {toggle.time && (
            <View style={styles.middle}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setNumber(text)}
                value={number}
              />
              <Picker
                style={styles.picker}
                selectedValue={time}
                onValueChange={(itemValue) => setTime(itemValue)}
              >
                <Picker.Item label="minutos" value="minutos" />
                <Picker.Item label="hora" value="hora" />
              </Picker>
            </View>
          )}
        </View>
        <View style={styles.typeContainer}>
          <View style={styles.timeHeader}>
            <CheckBox
              disabled={false}
              value={toggle.type}
              onValueChange={(newValue) =>
                setToggle((prev) => ({ ...prev, type: newValue }))
              }
            />
            <Text style={styles.label}>Tipo:</Text>
          </View>
          {toggle.type && (
            <Picker
              selectedValue={myType}
              onValueChange={(itemValue) => setMyType(itemValue)}
            >
              <Picker.Item label="Pelicula" value="Pelicula" />
              <Picker.Item label="Serie" value="Serie" />
              <Picker.Item label="Ejercicio" value="Ejercicio" />
              <Picker.Item label="Cocina" value="Cocina" />
            </Picker>
          )}
        </View>
        <TouchableOpacity onPress={handleFilter} style={styles.buttom}>
          <Text style={styles.btnText}>Filtrar</Text>
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
  filterContainer: {
    height: "100%",
    marginTop: 100,
    alignSelf: "center",
    width: "30%",
  },
  label: {
    flex: 1,
    paddingLeft: 25,
    fontWeight: "500",
    fontFamily: "Cochin",
    fontSize: 20,
  },
  timeHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 23,
    marginBottom: 23,
  },
  input: {
    fontSize: 15,
    fontFamily: "Cochin",
    alignSelf: "stretch",
    height: 30,
    borderBottomColor: "#1f6f8b",
    borderBottomWidth: 1,
    opacity: 0.9,
  },
  middle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttom: {
    alignSelf: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#00acee",
    marginTop: 30,
    width: "65%",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  picker: {
    width: "40%",
  },
});
