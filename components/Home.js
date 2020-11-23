import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Header } from "./Header";

const API_KEY = "13ded7d2";

const Item = ({ movie, runtime, navigation }) => {
  const [recomendation, setRecomendation] = useState([]);

  useEffect(() => {
    fetRecommendation();
  }, []);

  const fetRecommendation = async () => {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${API_KEY}&s=${movie}&plot`
    );
    const data = await response.json();
    setRecomendation(data.Response == "True" ? data.Search[0] : null);
  };

  const handlePress = () => {
    navigation.navigate("Actividad", movie);
  };

  return (
    recomendation && (
      <TouchableOpacity onPress={handlePress}>
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
      </TouchableOpacity>
    )
  );
};

export const Home = ({ route, navigation }) => {
  const user = route.params;
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities(user.id);
  }, [user.id]);

  const fetchActivities = async (user_id) => {
    const res = await fetch(`http://localhost:8000/recommendation/${user_id}/`);
    if (res.status == 200) {
      const data = await res.json();
      setActivities(data);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Item movie={item.movie} runtime={item.runtime} navigation={navigation} />
    );
  };

  return (
    <View style={styles.homeContainer}>
      <Header />
      <Text style={styles.title}>
        Elije tu actividad favorita para el dia de hoy!
      </Text>
      <FlatList
        data={activities}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  homeContainer: {
    flex: 1,
    backgroundColor: "#fff",
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
