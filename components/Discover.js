import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Header } from "./Header";

const API_KEY = "13ded7d2";

const Item = ({ title, runtime }) => {
  const [recomendation, setRecomendation] = useState([]);

  useEffect(() => {
    fetRecommendation();
    return () => new AbortController().abort();
  }, []);

  const fetRecommendation = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&plot`
    );
    const data = await response.json();
    setRecomendation(data.Response == "True" ? data.Search[0] : null);
  };

  return (
    recomendation && (
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
    )
  );
};

export const Discover = ({ route }) => {
  const user = route.params;
  const [newRecommendation, setNewRecommendation] = useState([]);

  useEffect(() => {
    fetchData();
    return () => new AbortController().abort();
  }, [user]);

  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:8000/recommendation/discover/"
    );
    const data = await response.json();
    let filteredList = [...new Set(data.map(JSON.stringify))].map(JSON.parse);
    setNewRecommendation(filteredList);
  };

  const renderItem = ({ item }) => {
    return <Item title={item.title} runtime={item.runtime} />;
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Actividades que pensamos te gustaran!</Text>
      <FlatList
        data={newRecommendation}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
