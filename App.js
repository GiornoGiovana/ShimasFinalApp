import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Fontisto, Feather } from "@expo/vector-icons";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Discover } from "./components/Discover";
import { Filter } from "./components/Filter";
import { Search } from "./components/Search";
import { Quiz } from "./components/Quiz";
import { FilterList } from "./components/FilterList";
import { EditProfile } from "./components/EditProfile";
import { Activity } from "./components/Activity";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const MyTabs = ({ route }) => {
  const user = route.params;
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        initialParams={user}
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        initialParams={user}
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        initialParams={user}
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color }) => (
            <Fontisto name="world-o" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        initialParams={user}
        name="Filter"
        component={Filter}
        options={{
          tabBarLabel: "Filter",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="filter" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        initialParams={user}
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <Feather name="search" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Iniciar Sesion" component={Login} />
        <Stack.Screen name="Registrarse" component={Signup} />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Actividades Filtradas"
          component={FilterList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Editar"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Actividad"
          component={Activity}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  navigator: {
    backgroundColor: "#ea6227",
  },
});
