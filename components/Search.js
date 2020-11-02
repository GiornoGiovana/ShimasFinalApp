import React, { useState } from "react";
import { Button, StyleSheet, Text, View, TextInput, Image } from "react-native";
import { Header } from "./Header";

const API_KEY = "13ded7d2";

export const Search = ({ route }) => {
  const user = route.params;

  const [textSearch, setTextSearch] = useState("");
  const [recomendation, setRecomendation] = useState({});

  const handleSearch = async () => {
    if (textSearch) {
      const response = await fetch(
        `http://localhost:8000/recommendation/${user.id}/${textSearch}`
      );
      if (response.status == 200) {
        const data = await response.json();
        searchActivity(data.movie);
      } else {
        alert("Recommendation not found");
      }
    } else {
      alert("Por favor ingrese alguna recomendacion");
    }
  };

  const searchActivity = async (movie) => {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}&plot`
    );
    const data = await res.json();
    setRecomendation(data.Response == "True" ? data.Search[0] : null);
  };

  return (
    <>
      <View style={styles.containter}>
        <Header />
        <View style={styles.searchBar}>
          <TextInput
            underlineColorAndroid={"transparent"}
            style={styles.input}
            value={textSearch}
            onChangeText={(text) => setTextSearch(text)}
          />
          <Button title="Buscar" onPress={handleSearch} />
        </View>
        {recomendation && (
          <View style={styles.itemCotainer}>
            <Image
              style={styles.img}
              source={{
                uri: recomendation.Poster,
              }}
            />
            <View style={styles.infoSection}>
              <Text style={styles.info}>{recomendation.Title}</Text>
              <Text style={styles.info}>{recomendation.Year}</Text>
              <Text style={styles.info}>{recomendation.Type}</Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    margin: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "45%",
    alignSelf: "center",
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Cochin",
    alignSelf: "stretch",
    height: 30,
    borderBottomColor: "#1f6f8b",
    borderBottomWidth: 1,
    opacity: 0.9,
    marginRight: 20,
  },
  itemCotainer: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    marginBottom: 35,
    alignSelf: "center",
    justifyContent: "space-between",
    width: "50%",
    padding: 10,
  },
  infoSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginLeft: 140,
  },
  info: {
    color: "#84a9ac",
    fontWeight: "550",
    fontSize: "25",
    fontFamily: "Courier New",
  },
  img: {
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  title: {
    alignSelf: "center",
    margin: 10,
    marginTop: 40,
    marginBottom: 40,
    fontSize: 20,
    fontFamily: "Comic Sans MS",
    color: "#382933",
    fontWeight: "800",
  },
});
