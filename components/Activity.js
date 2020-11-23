import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Header } from "./Header";

const API_KEY = "13ded7d2";

export const Activity = ({ navigation, route }) => {
  const title = route.params;
  const [recomendation, setRecomendation] = useState([]);

  useEffect(() => {
    fetRecommendation();
  }, []);

  const fetRecommendation = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&plot`
    );
    const data = await response.json();
    const movie = data.Search[0];
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
    );
    const mymovie = await res.json();

    setRecomendation(mymovie);
    console.log(mymovie);
  };

  return (
    <View>
      <Header />
      <TouchableOpacity
        onPress={() => navigation.navigate("MyTabs")}
        style={styles.buttom}
      >
        <Text style={styles.btnText}>Regresar</Text>
      </TouchableOpacity>
      <View style={styles.itemCotainer}>
        <Image
          style={styles.img}
          source={{
            uri: recomendation.Poster,
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{recomendation.Title}</Text>
          <View style={{ width: 400, flexGrow: 1 }}>
            <Text style={{ color: "#30475e" }}>{recomendation.Plot}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.info}>{recomendation.Year}</Text>
            <Text style={styles.info}>Director: {recomendation.Director}</Text>
            <Text style={styles.info}>{recomendation.Runtime}</Text>
          </View>
          <Text style={{ color: "#30475e" }}>
            Actores: {recomendation.Actors}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttom: {
    alignSelf: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ff5722",
    marginTop: 30,
    marginBottom: 30,
    width: 200,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  itemCotainer: {
    flex: 1,
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
    flexDirection: "row",
    justifyContent: "space-between",
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
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  plot: {
    flex: 1,
    flexShrink: 1,
    flexGrow: 1,
  },
});
