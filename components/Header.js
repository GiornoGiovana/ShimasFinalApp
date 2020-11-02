import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>SHIMAS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingTop: 30,
    backgroundColor: "#ff5722",
  },
  title: {
    textAlign: "center",
    color: "#19d3da",
    fontSize: 30,
    fontWeight: "600",
    fontFamily: "Garamond",
  },
});
