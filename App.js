import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomePage from "./components/HomePage";
import MemePage from "./components/MemePage";
import Ionicons from "@expo/vector-icons/Ionicons";
import ActualMeme from "./components/ActualMeme";

const Tab = createBottomTabNavigator();

// ++++++++++++++++++++++++++++++++++++++++++++++++++HOME PAGE IS THE DADJOKE/RICK AND MORTHY *************************

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "R&M Dad") {
              iconName = focused ? "happy" : "happy-outline";
            } else if (route.name === "Popular meme data") {
              iconName = focused ? "flame" : "flame-outline";
            } else if (route.name === "Memes") {
              iconName = focused ? "newspaper" : "newspaper-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "purple",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Memes" component={ActualMeme} />
        <Tab.Screen name="Popular meme data" component={MemePage} />
        <Tab.Screen name="R&M Dad" component={HomePage} />
      </Tab.Navigator>
      {/* <HomePage /> */}
      {/* <MemePage /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
