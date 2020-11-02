import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Header } from "./Header";

const API_KEY = "13ded7d2";

const Item = ({ title, runtime }) => {
  const [recomendation, setRecomendation] = useState([]);

  useEffect(() => {
    fetRecommendation();
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
          <Text style={styles.info}>Tiempo: {runtime} minutos</Text>
        </View>
      </View>
    )
  );
};

export const FilterList = ({ navigation, route }) => {
  const myRecommendation = route.params;

  const renderItem = ({ item }) => {
    return <Item title={item.movie} runtime={item.runtime} />;
  };

  return (
    <View>
      <Header />
      <TouchableOpacity
        onPress={() => navigation.navigate("Filter")}
        style={styles.buttom}
      >
        <Text style={styles.btnText}>Regresar</Text>
      </TouchableOpacity>

      <FlatList
        data={myRecommendation}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
      />
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
});
